const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:7777/products/featured'); // Cambia a /featured para obtener solo 6 productos
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const seccion = document.getElementById('cards'); // Asegúrate de que el ID 'cards' esté en tu HTML
const products = fetchProducts();

products.then(data => {
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.customId);
        const link = document.createElement("a");
        link.href = "./catalogo.html";
        const cardContent = `
            <div class="card-image">
                <img src="${producto.imageUrl}" alt="${producto.name}" /> 
            </div>
            <div class="card-content">
            <span class="card-title">${producto.name}</span>
            </div>
        `;
        link.innerHTML = cardContent
        card.appendChild(link)
        seccion.appendChild(card);
    });
});
