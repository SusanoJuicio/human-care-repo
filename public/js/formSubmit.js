// formSubmit.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita el envío del formulario por defecto

            const formData = new FormData(this); // Obtiene los datos del formulario

            fetch('https://formspree.io/f/xzzbqrkw', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Formulario enviado con éxito',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            background: '#D9D9D9', // Color de fondo
                            color: '#3E85A4', // Color del texto
                            iconColor: '#4CAF50', // Color del icono (verde para éxito)
                            customClass: {
                                confirmButton: 'btn-confirm'// Clase personalizada para el botón
                            }
                        });
                        this.reset(); // Reinicia el formulario
                    } else {
                        Swal.fire({
                            title: '¡Atención!',
                            text: 'Hubo un error al enviar el formulario',
                            icon: 'warning',
                            confirmButtonText: 'Aceptar',
                            background: '#D9D9D9', // Color de fondo
                            color: '#3E85A4', // Color del texto
                            iconColor: '#FF9800', // Color del icono (naranja para advertencia)
                            customClass: {
                                confirmButton: 'btn-confirm' // Clase personalizada para el botón
                            }
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: '¡Atención!',
                        text: 'Error:' + error.message,
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                        background: '#D9D9D9', // Color de fondo
                        color: '#3E85A4', // Color del texto
                        iconColor: '#FF9800', // Color del icono (naranja para advertencia)
                        customClass: {
                            confirmButton: 'btn-confirm' // Clase personalizada para el botón
                        }
                    });
                });
        });
    }
});
