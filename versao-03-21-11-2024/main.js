import { initSystems } from './pages/systems.js';
import { initUsers } from './pages/users.js';
import { initPermissions } from './pages/permissions.js';
import { initLogin } from './pages/login.js';
import { checkAuth } from './utils/auth.js';

// Initialize local storage with some sample data if empty
if (!localStorage.getItem('systems')) {
    localStorage.setItem('systems', JSON.stringify([]));
}
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('permissions')) {
    localStorage.setItem('permissions', JSON.stringify([]));
}

// Router
const pages = {
    systems: initSystems,
    users: initUsers,
    permissions: initPermissions
};

let currentPage = 'systems';

export function navigateToPage(pageName) {
    const app = document.getElementById('app');
    app.innerHTML = '';
    currentPage = pageName;
    pages[pageName](app);
}

// Initialize auth state
function initApp() {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    
    if (checkAuth()) {
        authContainer.style.display = 'none';
        appContainer.style.display = 'block';
        navigateToPage('systems');
    } else {
        authContainer.style.display = 'block';
        appContainer.style.display = 'none';
        initLogin(authContainer);
    }
}

// Event listeners
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        if (page) {
            navigateToPage(page);
        }
    });
});

document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    initApp();
});

// Initialize app
initApp();