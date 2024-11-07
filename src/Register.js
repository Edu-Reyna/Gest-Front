//Funcion para registrar un usuario tomando los datos del formulario de registro y enviandolos al backend
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('errorMessage');
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Las contrasenas no coinciden';
            return;
        }

        const estudiante = {email: email, contrasena: password};

        try {
            const response = await fetch("http://localhost:8080/usuarios/registrar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(estudiante)
            });

            if (!response.ok) {
                throw new Error('Fallo al registrar usuario');
            }

            const responseText = await response.text();

            alert(responseText);

            window.location.href = '/login.html';
                }

        catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});