import { initAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const estudiante = {email: email, contrasena: password};

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(estudiante)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const userId = await response.text();
            
            // Store the user ID and login status
            const id = parseInt(userId);
            localStorage.setItem('userId', id);
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to dashboard
            window.location.href = '/index.html';
        } catch (error) {
            errorMessage.textContent = 'Invalid email or password';
            errorMessage.style.display = 'block';
            console.error('Login error:', error);
        }
    });
});