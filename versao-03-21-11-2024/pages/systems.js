import { setLoading } from '../utils/loading.js';
import { api } from '../utils/api.js';

export function initSystems(container) {
    const template = `
        <div class="systems-page">
            <h1>Systems Management</h1>
            <form id="systemForm">
                <div class="form-group">
                    <label for="siscodigo">System Code</label>
                    <input type="number" id="siscodigo" required>
                </div>
                <div class="form-group">
                    <label for="sisnome">System Name</label>
                    <input type="text" id="sisnome" required>
                </div>
                <div class="form-group">
                    <label for="sisativo">Active</label>
                    <input type="checkbox" id="sisativo">
                </div>
                <button type="submit">Save System</button>
            </form>
            <table id="systemsTable">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;

    container.innerHTML = template;

    const form = document.getElementById('systemForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const table = document.getElementById('systemsTable').querySelector('tbody');

    async function loadSystems() {
        try {
            const systems = await api.getSystems();
            table.innerHTML = systems.map(system => `
                <tr>
                    <td>${system.siscodigo}</td>
                    <td>${system.sisnome}</td>
                    <td>${system.sisativo ? 'Yes' : 'No'}</td>
                    <td>
                        <button onclick="deleteSystems(${system.siscodigo})">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error loading systems:', error);
            alert('Error loading systems. Please try again.');
        }
    }

    window.deleteSystems = async function(code) {
        const button = table.querySelector(`button[onclick="deleteSystems(${code})"]`);
        setLoading(button, true);
        
        try {
            await api.deleteSystem(code);
            await loadSystems();
        } catch (error) {
            console.error('Error deleting system:', error);
            alert('Error deleting system. Please try again.');
        } finally {
            setLoading(button, false);
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setLoading(submitButton, true);

        try {
            const newSystem = {
                siscodigo: parseInt(document.getElementById('siscodigo').value),
                sisnome: document.getElementById('sisnome').value,
                sisativo: document.getElementById('sisativo').checked
            };

            await api.createSystem(newSystem);
            form.reset();
            await loadSystems();
        } catch (error) {
            console.error('Error creating system:', error);
            alert('Error creating system. Please try again.');
        } finally {
            setLoading(submitButton, false);
        }
    });

    loadSystems();
}