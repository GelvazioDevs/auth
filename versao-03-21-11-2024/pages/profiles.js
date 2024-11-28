import { setLoading } from '../utils/loading.js';
import { api } from '../utils/api.js';

export function initProfiles(container) {
    const template = `
        <div class="profiles-page">
            <h1>Profile Management</h1>
            <form id="profileForm">
                <div class="form-group">
                    <label for="codigo">Code</label>
                    <input type="number" id="codigo" required>
                </div>
                <div class="form-group">
                    <label for="nome">Name</label>
                    <input type="text" id="nome" required>
                </div>
                <div class="form-group">
                    <label for="siscodigo">System Code</label>
                    <select id="siscodigo" required></select>
                </div>
                <div class="form-group">
                    <h3>Permissions</h3>
                    <label><input type="checkbox" id="index"> Index</label>
                    <label><input type="checkbox" id="update"> Update</label>
                    <label><input type="checkbox" id="insert"> Insert</label>
                    <label><input type="checkbox" id="delete"> Delete</label>
                </div>
                <button type="submit">Save Profile</button>
            </form>
            <table id="profilesTable">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>System Code</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;

    container.innerHTML = template;

    const form = document.getElementById('profileForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const table = document.getElementById('profilesTable').querySelector('tbody');
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

    async function loadProfiles() {
        try {
            const [profiles, systems] = await Promise.all([
                api.getProfiles(),
                api.getSystems()
            ]);

            table.innerHTML = profiles.map(profile => {
                const system = systems.find(s => s.siscodigo === profile.siscodigo);
                return `
                    <tr>
                        <td>${profile.codigo}</td>
                        <td>${profile.nome}</td>
                        <td>${system ? system.sisnome : 'Unknown'}</td>
                        <td>
                            Index: ${profile.permissions.index ? '✓' : '✗'}<br>
                            Update: ${profile.permissions.update ? '✓' : '✗'}<br>
                            Insert: ${profile.permissions.insert ? '✓' : '✗'}<br>
                            Delete: ${profile.permissions.delete ? '✓' : '✗'}
                        </td>
                        <td>
                            <button onclick="deleteProfile(${profile.codigo})">Delete</button>
                        </td>
                    </tr>
                `;
            }).join('');
        } catch (error) {
            console.error('Error loading profiles:', error);
            alert('Error loading profiles. Please try again.');
        }
    }

    window.deleteProfile = async function(code) {
        const button = table.querySelector(`button[onclick="deleteProfile(${code})"]`);
        setLoading(button, true);

        try {
            await api.deleteProfile(code);
            await loadProfiles();
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Error deleting profile. Please try again.');
        } finally {
            setLoading(button, false);
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setLoading(submitButton, true);

        try {
            const newProfile = {
                codigo: parseInt(document.getElementById('codigo').value),
                nome: document.getElementById('nome').value,
                siscodigo: parseInt(document.getElementById('siscodigo').value),
                permissions: {
                    index: document.getElementById('index').checked,
                    update: document.getElementById('update').checked,
                    insert: document.getElementById('insert').checked,
                    delete: document.getElementById('delete').checked
                }
            };

            await api.createProfile(newProfile);
            form.reset();
            await loadProfiles();
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('Error creating profile. Please try again.');
        } finally {
            setLoading(submitButton, false);
        }
    });

    loadSystems();
    loadProfiles();
}