import { api } from '../utils/api.js';
import { setLoading } from '../utils/loading.js';

export function initPermissions(container) {
    const template = `
        <div class="permissions-page">
            <h1>Permissions Management</h1>
            <button class="add-button" id="openModal">+ Add New Permission</button>
            <table id="permissionsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>System</th>
                        <th>Permissions</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <!-- Modal -->
        <div class="modal" id="permissionModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Add New Permission</h2>
                    <button class="close-modal" id="closeModal">&times;</button>
                </div>
                <form id="permissionForm">
                    <div class="form-group">
                        <label for="id">ID</label>
                        <input type="number" id="id" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="siscodigo">System</label>
                        <select id="siscodigo" required></select>
                    </div>
                    <div class="form-group permissions-group">
                        <h3>Permissions</h3>
                        <label>
                            <input type="checkbox" id="index" checked>
                            Index
                        </label>
                        <label>
                            <input type="checkbox" id="update" checked>
                            Update
                        </label>
                        <label>
                            <input type="checkbox" id="insert" checked>
                            Insert
                        </label>
                        <label>
                            <input type="checkbox" id="delete" checked>
                            Delete
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="active" checked>
                            Active
                        </label>
                    </div>
                    <div class="button-container">
                        <button type="button" id="cancelButton">Cancel</button>
                        <button type="submit" class="add-button">Save Permission</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = template;

    const modal = document.getElementById('permissionModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelButton');
    const form = document.getElementById('permissionForm');
    const table = document.getElementById('permissionsTable').querySelector('tbody');
    const systemSelect = document.getElementById('siscodigo');

    async function loadSystems() {
        try {
            const systems = await api.getSystems();
            systemSelect.innerHTML = systems
                .filter(system => system.sisativo)
                .map(system => `
                    <option value="${system.siscodigo}">${system.sisnome}</option>
                `).join('');
        } catch (error) {
            console.error('Error loading systems:', error);
            alert('Error loading systems. Please try again.');
        }
    }

    async function loadPermissions() {
        try {
            const [permissions, systems] = await Promise.all([
                api.getPermissions(),
                api.getSystems()
            ]);

            table.innerHTML = permissions.map(permission => {
                const system = systems.find(s => s.siscodigo === permission.siscodigo);
                return `
                    <tr>
                        <td>${permission.id}</td>
                        <td>${permission.name}</td>
                        <td>${system ? system.sisnome : 'Unknown'}</td>
                        <td>
                            Index: ${permission.permissions.index ? '✓' : '✗'}<br>
                            Update: ${permission.permissions.update ? '✓' : '✗'}<br>
                            Insert: ${permission.permissions.insert ? '✓' : '✗'}<br>
                            Delete: ${permission.permissions.delete ? '✓' : '✗'}
                        </td>
                        <td>${permission.active ? 'Yes' : 'No'}</td>
                        <td>
                            <button onclick="deletePermission(${permission.id})">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');
        } catch (error) {
            console.error('Error loading permissions:', error);
            alert('Error loading permissions. Please try again.');
        }
    }

    window.deletePermission = async function(id) {
        if (confirm('Are you sure you want to delete this permission?')) {
            const button = table.querySelector(`button[onclick="deletePermission(${id})"]`);
            setLoading(button, true);
            
            try {
                await api.deletePermission(id);
                await loadPermissions();
            } catch (error) {
                console.error('Error deleting permission:', error);
                alert('Error deleting permission. Please try again.');
            } finally {
                setLoading(button, false);
            }
        }
    };

    function openModal() {
        modal.classList.add('active');
        loadSystems();
    }

    function closeModal() {
        modal.classList.remove('active');
        form.reset();
    }

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        setLoading(submitButton, true);

        try {
            const newPermission = {
                id: parseInt(document.getElementById('id').value),
                name: document.getElementById('name').value,
                siscodigo: parseInt(document.getElementById('siscodigo').value),
                permissions: {
                    index: document.getElementById('index').checked,
                    update: document.getElementById('update').checked,
                    insert: document.getElementById('insert').checked,
                    delete: document.getElementById('delete').checked
                },
                active: document.getElementById('active').checked
            };

            await api.createPermission(newPermission);
            closeModal();
            await loadPermissions();
        } catch (error) {
            console.error('Error creating permission:', error);
            alert('Error creating permission. Please try again.');
        } finally {
            setLoading(submitButton, false);
        }
    });

    loadPermissions();
}