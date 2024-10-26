const fetchProducts = async () => {
    try {
        const response = await fetch('../../db/user.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const seccion = document.getElementById('infoUser');
const products = fetchProducts();
products.then(data => {
    data.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('user');
        const cardContent = `
            <div>
                <img src="${element.img}" alt="Usuario">
            </div>
            <div class="user-div-2">
                <p><strong>Nombre:</strong> ${element.nombre}</p>
                <p><strong>Apellido:</strong> ${element.apellido}</p>
                <p><strong>DNI:</strong> ${element.dni}</p>
                <p><strong>Teléfono:</strong> ${element.telefono}</p>
                <p><strong>Gmail:</strong> ${element.gmail}</p>
            </div>
        `;
        card.innerHTML = cardContent;
        seccion.appendChild(card);
    });
    // simula contenido para lo restante
    const card1 = document.createElement('div');
    card1.classList.add('f200')
    seccion.appendChild(card1);
    const card2 = document.createElement('div');
    card2.classList.add('f200')
    seccion.appendChild(card2)
});
