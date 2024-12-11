const d = document;
const form = d.getElementById('signUpForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gmail = d.getElementById('gmail').value;
    const password = d.getElementById('password').value;
    const confirmPassword = d.getElementById('confirmPassword').value;
    const nombre = d.getElementById('nombre').value;
    const apellido = d.getElementById('apellido').value;
    const telefono = d.getElementById('telefono').value;
    const dni = d.getElementById('dni').value;

    if (password !== confirmPassword) {
        Swal.fire({
            title: '¡Atención!',
            text: 'Las contraseñas tienen que ser iguales',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9',
            color: '#3E85A4',
            iconColor: '#FF9800',
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
        return;
    }

    const userData = {
        nombre,
        apellido,
        telefono,
        dni,
        gmail,
        password,
        nivel: 1
    };

    try {
        const response = await fetch('https://humancare-backend.onrender.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();


            const secretKey = 'REMOLACHA';
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(result), secretKey).toString();
            localStorage.setItem('user', encryptedData);
            localStorage.setItem('userId', result._id);
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            Swal.fire({
                title: 'Atención',
                text: 'Mail o dni ya existente',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                background: '#D9D9D9',
                color: '#3E85A4',
                iconColor: '#4CAF50',
                customClass: {
                    confirmButton: 'btn-confirm'
                }
            });
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
});
