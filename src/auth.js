export function initAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('userId');
    
    if ((!isLoggedIn || !userId) && window.location.pathname !== '/login.html') {
        window.location.href = '/login.html';
        return;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userId');
            window.location.href = '/login.html';
        });
    }
}