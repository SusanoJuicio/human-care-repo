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
                        alert('Formulario enviado con éxito!');
                        this.reset(); // Reinicia el formulario
                    } else {
                        alert('Hubo un problema al enviar el formulario.');
                    }
                })
                .catch(error => {
                    alert('Error: ' + error.message);
                });
        });
    }
});
