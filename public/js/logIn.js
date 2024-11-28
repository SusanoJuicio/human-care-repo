const d = document;
const form = d.getElementById('userForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gmail = d.getElementById('gmail').value;
    const password = d.getElementById('password').value;

    const userData = {
        gmail,
        password
    };

    try {
        const response = await fetch('http://localhost:7777/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Inicio de sesión exitoso:', result);
            window.location.href = 'index.html'; // Redirigir a la página principal
        } else {
            const error = await response.json();
            window.alert(error.message); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
});
