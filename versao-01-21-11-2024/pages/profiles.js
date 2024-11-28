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
    const table = document.getElementById('profilesTable').querySelector('tbody');
    const systemSelect = document.getElementById('siscodigo');

    function loadSystems() {
        const systems = JSON.parse(localStorage.getItem('systems') || '[]');
        systemSelect.innerHTML = systems.map(system => 
            `<option value="${system.siscodigo}">${system.sisnome}</option>`
        ).join('');
    }

    function loadProfiles() {
        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        table.innerHTML = profiles.map(profile => `
            <tr>
                <td>${profile.codigo}</td>
                <td>${profile.nome}</td>
                <td>${profile.siscodigo}</td>
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
        `).join('');
    }

    window.deleteProfile = function(code) {
        let profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        profiles = profiles.filter(p => p.codigo !== code);
        localStorage.setItem('profiles', JSON.stringify(profiles));
        loadProfiles();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
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

        profiles.push(newProfile);
        localStorage.setItem('profiles', JSON.stringify(profiles));
        form.reset();
        loadProfiles();
    });

    loadSystems();
    loadProfiles();
}