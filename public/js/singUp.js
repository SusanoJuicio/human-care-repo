const d = document;
const form = d.getElementById('signUpForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gmail = d.getElementById('gmail').value;
    const password = d.getElementById('password').value;
    const confirmPassword = d.getElementById('confirmPassword').value; // Obtener la contraseña de confirmación
    const nombre = d.getElementById('nombre').value;
    const apellido = d.getElementById('apellido').value;
    const telefono = d.getElementById('telefono').value;
    const dni = d.getElementById('dni').value;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        window.alert('Las contraseñas no coinciden.');
        return;
    }

    const userData = {
        nombre,
        apellido,
        telefono,
        dni,
        gmail,
        password
    };

    try {
        const response = await fetch('http://localhost:7777/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Usuario registrado:', result);

            // Cifrar los datos del usuario antes de almacenarlos
            const secretKey = 'REMOLACHA';
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(result), secretKey).toString();
            localStorage.setItem('user', encryptedData);

            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            window.alert(error.message);
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
});
