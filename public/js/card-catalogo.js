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
products.then(data => {
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.customId);
        const isOutOfStock = producto.stock <= 0;

        const cardContent = `
            <div class="card-image">
                <img src="${producto.imageUrl}" alt="${producto.name}" />
            </div>
            <div class="card-content">
                <span class="card-title">${producto.name}</span>
                <span class="price">$${producto.price}</span>
                <span class="stock">${isOutOfStock ? 'No hay Stock' : `Stock: ${producto.stock}`}</span>
                ${!isOutOfStock ? `<img class="cart-icon" src="../images/cart.svg" alt="Añadir al carrito" data-id="${producto.customId}">` : ''}
            </div>
            <img class="card-hearth" src="../images/hearth.svg" alt="hearth" data-id="${producto.customId}">
        `;

        card.innerHTML = cardContent;
        seccion.appendChild(card);
    });
    const addToCartButtons = document.querySelectorAll('.cart-icon');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        });
    });
    const hearts = document.querySelectorAll('.card-hearth');
    hearts.forEach(heart => {
        heart.addEventListener('click', (event) => {
            event.stopPropagation();
            const productId = event.target.getAttribute('data-id');
            toggleWishlist(productId);
        });
    });
});

const seccion = document.getElementById('cards');
const filtros = document.querySelectorAll('.filter_tipe');

const displayProducts = (data) => {
    seccion.innerHTML = ''; // Limpiar la sección antes de mostrar los productos
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('key', producto.customId);

        const isOutOfStock = producto.stock <= 0;

        const cardContent = `
            <div class="card-image">
                <img src="${producto.imageUrl}" alt="${producto.name}" />
            </div>
            <div class="card-content">
                <span class="card-title">${producto.name}</span>
                <span class="price">$${producto.price}</span>
                <span class="stock">${isOutOfStock ? 'No hay Stock' : `Stock: ${producto.stock}`}</span>
                ${!isOutOfStock ? `<img class="cart-icon" src="../images/cart.svg" alt="Añadir al carrito" data-id="${producto.customId}">` : ''}
            </div>
            <img class="card-hearth" src="../images/hearth.svg" alt="hearth" data-id="${producto.customId}">
        `;

        card.innerHTML = cardContent;
        seccion.appendChild(card);
    });
    const addToCartButtons = document.querySelectorAll('.cart-icon');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        });
    });
    const hearts = document.querySelectorAll('.card-hearth');
    hearts.forEach(heart => {
        heart.addEventListener('click', (event) => {
            event.stopPropagation();
            const productId = event.target.getAttribute('data-id');
            toggleWishlist(productId);
        });
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
const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.productId === productId)) {
        const obj = { productId, quantity: 1 };
        cart.push(obj);
        localStorage.setItem('cart', JSON.stringify(cart));
        Swal.fire({
            title: '¡Éxito!',
            text: 'Producto añadido al carrito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9', // Color de fondo
            color: '#3E85A4', // Color del texto
            iconColor: '#4CAF50', // Color del icono (verde para éxito)
            customClass: {
                confirmButton: 'btn-confirm' // Clase personalizada para el botón
            }
        });
    } else {
        Swal.fire({
            title: '¡Atención!',
            text: 'El producto ya está en el carrito',
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
};
// Agregar eventos a los filtros
filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        const category = filtro.getAttribute('data-category');
        filterProducts(category); // Filtrar productos según la categoría seleccionada
    });
});
// Función para agregar o quitar de la lista de deseos
const toggleWishlist = (productId) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.includes(productId)) {
        // Si ya está en la lista de deseos, lo eliminamos
        wishlist = wishlist.filter(id => id !== productId);
        Swal.fire({
            title: '¡Atención!',
            text: 'El producto ya está en tus deseos',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9', // Color de fondo
            color: '#3E85A4', // Color del texto
            iconColor: '#FF9800', // Color del icono (naranja para advertencia)
            customClass: {
                confirmButton: 'btn-confirm' // Clase personalizada para el botón
            }
        });
    } else {
        // Si no está, lo agregamos
        wishlist.push(productId);
        Swal.fire({
            title: '¡Éxito!',
            text: 'Producto añadido a tus deseos',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9', // Color de fondo
            color: '#3E85A4', // Color del texto
            iconColor: '#4CAF50', // Color del icono (verde para éxito)
            customClass: {
                confirmButton: 'btn-confirm'// Clase personalizada para el botón
            }
        });
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateHeartIcons();
};

// Función para actualizar los íconos de corazón
const updateHeartIcons = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const hearts = document.querySelectorAll('.card-hearth');

    hearts.forEach(heart => {
        const productId = heart.getAttribute('data-id');
        if (wishlist.includes(productId)) {
            heart.style.display = 'none'; // Ocultar el corazón si está en la lista de deseos
        } else {
            heart.style.display = 'block'; // Mostrar el corazón si no está en la lista de deseos
        }
    });
};

// Llamar a la función para actualizar los íconos al cargar la página
updateHeartIcons();


