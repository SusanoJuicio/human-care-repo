
document.addEventListener('DOMContentLoaded', () => {
    const secretKey = 'Remolacha';
    const encryptedUser = localStorage.getItem('user');

    if (!encryptedUser) {
        window.location.href = 'logIn.html';
    } else {
        // Descifrar los datos del usuario
        const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
        const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const seccion = document.getElementById('infoUser');
        seccion.innerHTML = `
            <p><strong>Nombre:</strong> ${user.nombre}</p>
            <p><strong>Apellido:</strong> ${user.apellido}</p>
            <p><strong>DNI:</strong> ${user.dni}</p>
            <p><strong>Teléfono:</strong> ${user.telefono}</p>
        `;
    }
});
