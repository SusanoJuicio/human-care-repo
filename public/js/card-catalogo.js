const fetchProducts = async () => {
    try {
        const response = await fetch('../../db/productos.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const seccion = document.getElementById('cards')
const products = fetchProducts();

products.then(data => {
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.id);

        const cardContent = `
        <div class="card-image">
            <img src="${producto.img}" />
        
        </div>
                <span class="card-title">${producto.nombre}</span>
            <span class="price">$${producto.precio}</span>
            <img class="card-hearth" src="../images/hearth.svg" alt="hearth">
            
        `;
        card.innerHTML = cardContent;
        seccion.appendChild(card);
    });
});
