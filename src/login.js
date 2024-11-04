loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const estudiante = { email: email, contrasena: password };

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estudiante)
        });


        if (!response.ok) {
            throw new Error('Fallo al iniciar sesión');
        }

        const userId = await response.text();
        
        if (userId) {
            localStorage.setItem('userId', parseInt(userId));
            localStorage.setItem('isLoggedIn', 'true');
            
            window.location.href = '/index.html';
        } else {

            errorMessage.textContent = 'Correo electrónico o contraseña incorrectos';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Correo electrónico o contraseña incorrectos';
        errorMessage.style.display = 'block';
        console.error('Login error:', error);
    }
});
