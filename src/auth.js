//Funcion para cerrar sesion borrando el id del local storage y redireccionando al login
export function initAuth() {

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