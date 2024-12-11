const fetchProducts = async () => {
    try {
        const response = await fetch('https://humancare-backend.onrender.com/products');
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
    seccion.innerHTML = ''; //
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
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(producto => producto.categories === category);
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
            background: '#D9D9D9',
            color: '#3E85A4',
            iconColor: '#4CAF50',
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
    } else {
        Swal.fire({
            title: '¡Atención!',
            text: 'El producto ya está en el carrito',
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
};

filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        const category = filtro.getAttribute('data-category');
        filterProducts(category);
    });
});

const toggleWishlist = (productId) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        Swal.fire({
            title: '¡Atención!',
            text: 'El producto ya está en tus deseos',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9',
            color: '#3E85A4',
            iconColor: '#FF9800',
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
    } else {
        wishlist.push(productId);
        Swal.fire({
            title: '¡Éxito!',
            text: 'Producto añadido a tus deseos',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9',
            color: '#3E85A4',
            iconColor: '#4CAF50',
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateHeartIcons();
};

const updateHeartIcons = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const hearts = document.querySelectorAll('.card-hearth');

    hearts.forEach(heart => {
        const productId = heart.getAttribute('data-id');
        if (wishlist.includes(productId)) {
            heart.style.display = 'none';
        } else {
            heart.style.display = 'block';
        }
    });
};

updateHeartIcons();
