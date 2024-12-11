// formSubmit.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(this);

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
                            background: '#D9D9D9', //
                            color: '#3E85A4',
                            iconColor: '#4CAF50',
                            customClass: {
                                confirmButton: 'btn-confirm'
                            }
                        });
                        this.reset();
                    } else {
                        Swal.fire({
                            title: '¡Atención!',
                            text: 'Hubo un error al enviar el formulario',
                            icon: 'warning',
                            confirmButtonText: 'Aceptar',
                            background: '#D9D9D9',
                            color: '#3E85A4',
                            iconColor: '#FF9800',
                            customClass: {
                                confirmButton: 'btn-confirm'
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
                        background: '#D9D9D9',
                        color: '#3E85A4',
                        iconColor: '#FF9800',
                        customClass: {
                            confirmButton: 'btn-confirm'
                        }
                    });
                });
        });
    }
});
