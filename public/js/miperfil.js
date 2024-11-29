// En miperfil.js
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = 'logIn.html';
    } else {
        const seccion = document.getElementById('infoUser');
        seccion.innerHTML = `
            <p><strong>Nombre:</strong> ${user.nombre}</p>
            <p><strong>Apellido:</strong> ${user.apellido}</p>
            <p><strong>DNI:</strong> ${user.dni}</p>
            <p><strong>Teléfono:</strong> ${user.telefono}</p>
        `;
    }
});
