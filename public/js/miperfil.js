document.addEventListener('DOMContentLoaded', () => {
    const secretKey = 'REMOLACHA';
    const encryptedUser = localStorage.getItem('user');

    if (!encryptedUser) {
        window.location.href = 'logIn.html';
    } else {
        // Descifrar los datos del usuario
        const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
        const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const seccion = document.getElementById('infoUser');
        seccion.innerHTML = `
            <div class="user-info">
            <h3 class="user-level-title"><strong>Nivel Actual:</strong> <span class="user-info-value">${user.nivel}</span></h3>
                <div class="info-container">
            <p class="user-info-item"><strong>Nombre:</strong> <span class="user-info-value">${user.nombre}</span></p>
                <p class="user-info-item"><strong>Apellido:</strong> <span class="user-info-value">${user.apellido}</span></p>
                <p class="user-info-item"><strong>DNI:</strong> <span class="user-info-value">${user.dni}</span></p>
                <p class="user-info-item"><strong>Teléfono:</strong> <span class="user-info-value">${user.telefono}</span></p>
            <div/>
        </div>
        `;
    }
});
