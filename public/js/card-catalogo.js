const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:7777/products'); // Cambia a tu endpoint real
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error al obtener productos:', err);
    }
}
const products = fetchProducts();
console.log(products);
products.then(data => {
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.id);

        const cardContent = `
            <div class="card-image">
                <img src="${producto.imageUrl}" alt="${producto.name}" />
            </div>
            <span class="card-title">${producto.name}</span>
            <span class="price">$${producto.price}</span>
            <span class="stock">Stock: ${producto.stock}</span> <!-- Mostrar el stock -->
            <img class="card-hearth" src="../images/hearth.svg" alt="hearth">
        `;
        card.innerHTML = cardContent;
        seccion.appendChild(card);
    });
});

const seccion = document.getElementById('cards');
const filtros = document.querySelectorAll('.filter_tipe');

const displayProducts = (data) => {
    seccion.innerHTML = ''; // Limpiar la sección antes de mostrar los productos
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.id);

        const cardContent = `
            <div class="card-image">
                <img src="${producto.imageUrl}" alt="${producto.name}" />
            </div>
            <span class="card-title">${producto.name}</span>
            <span class="price">$${producto.price}</span>
            <span class="stock">Stock: ${producto.stock}</span> <!-- Mostrar el stock -->
            <img class="card-hearth" src="../images/hearth.svg" alt="hearth">
        `;

        card.innerHTML = cardContent;
        seccion.appendChild(card);
    });
};

const filterProducts = async (category) => {
    const products = await fetchProducts();
    if (category === 'Todos') {
        displayProducts(products); // Mostrar todos los productos
    } else {
        const filteredProducts = products.filter(producto => producto.categories === category); // Filtrar por categoría
        displayProducts(filteredProducts);
    }
};

// Agregar eventos a los filtros
filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        const category = filtro.getAttribute('data-category');
        filterProducts(category); // Filtrar productos según la categoría seleccionada
    });
});
