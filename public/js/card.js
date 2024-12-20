const fetchProducts = async () => {
    try {
        const response = await fetch('https://humancare-backend.onrender.com/products/featured');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const seccion = document.getElementById('cards');
const products = fetchProducts();

products.then(data => {
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.customId);
        const link = document.createElement('a');
        link.href = './catalogo.html';
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
