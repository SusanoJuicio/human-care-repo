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
        const response = await fetch('https://humancare-backend.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Inicio de sesión exitoso:', result);
            const secretKey = 'REMOLACHA';
            // eslint-disable-next-line no-undef
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(result.user), secretKey).toString();
            localStorage.setItem('user', encryptedData);
            localStorage.setItem('userId', result.user._id);
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            Swal.fire({
                title: '¡Atención!',
                text: 'Mail o Contraseña incorrecta',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                background: '#D9D9D9', // Color de fondo
                color: '#3E85A4', // Color del texto
                iconColor: '#FF9800', // Color del icono (verde para éxito)
                customClass: {
                    confirmButton: 'btn-confirm'// Clase personalizada para el botón
                }
            });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
});
