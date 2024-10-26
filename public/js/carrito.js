const fetchProducts = async () => {
    try {
        const response = await fetch("../db/cart.product.json");
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const contenedor = document.getElementById("productos");
const carritoContenedor = document.getElementById("carrito");

const products = fetchProducts();
products.then(data => {
    data.forEach(producto => {
        const productoCard = document.createElement("div");
        productoCard.classList.add("card");

        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
        `;

        contenedor.appendChild(productoCard);
    });

    // Actualizar el carrito
    const carritoItems = data.map(producto => `
        <li>${producto.nombre} <span>$${producto.precio}</span></li>
    `).join('');

    carritoContenedor.innerHTML = `
        <h2>Carrito de Compras</h2>
        <ul>${carritoItems}</ul>
        <p class="total">Total: $${data.reduce((total, producto) => total + producto.precio, 0)}</p>
        <a href="seccionPagos.html" class="boton-pago">Ir a Pagar</a>
    `;
});
