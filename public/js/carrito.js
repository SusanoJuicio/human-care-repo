document.addEventListener('DOMContentLoaded', () => {
    const carritoContenedor = document.getElementById('carrito-items');
    const totalPriceElement = document.getElementById('total-price'); // Elemento para mostrar el total

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:7777/products'); // Cambia a tu endpoint real
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error al obtener productos:', err);
            return [];
        }
    };

    const updateCartDisplay = async () => {
        carritoContenedor.innerHTML = ''; // Limpiar la lista antes de mostrar los elementos
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const products = await fetchProducts(); // Obtener todos los productos

        let total = 0; // Inicializar el total

        if (cartItems.length === 0) {
            carritoContenedor.innerHTML = '<li>No hay productos en el carrito.</li>';
            totalPriceElement.textContent = total; // Actualizar el total a 0
        } else {
            cartItems.forEach(cartItem => {
                const product = products.find(p => p.customId === parseInt(cartItem.productId)); // Buscar el producto por customId

                if (product) {
                    const quantity = cartItem.quantity; // Obtener la cantidad
                    const itemTotal = product.price * quantity; // Calcular el total del item
                    total += itemTotal; // Sumar al total

                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div class="cart-item">
                            <img src="${product.imageUrl}" alt="${product.name}" class="cart-item-image">
                            <div class="cart-item-info">
                                <h3>${product.name}</h3>
                                <p>Precio: $${product.price}</p>
                                <p>Cantidad: <span class="item-quantity">${quantity}</span></p>
                            </div>
                            <div class="item-content">
                            <button class="remove-from-cart button" data-id="${product.customId}">Eliminar</button>
                            <button class="increase-quantity button" data-id="${product.customId}">+</button>
                            <button class="decrease-quantity button" data-id="${product.customId}">-</button>
                            </div>
                        </div>
                    `;
                    carritoContenedor.appendChild(listItem);
                }
            });
        }

        totalPriceElement.textContent = total.toFixed(2); // Actualizar el total en el DOM
        addCartEventListeners();
    };

    const addCartEventListeners = () => {
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                removeFromCart(productId);
            });
        });

        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                updateQuantity(productId, 'increase');
            });
        });

        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                updateQuantity(productId, 'decrease');
            });
        });
    };

    const addToCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.productId === productId);

        if (existingProduct) {
            existingProduct.quantity += 1; // Aumentar la cantidad
        } else {
            const obj = { productId, quantity: 1 }; // Crear nuevo objeto
            cart.push(obj);
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
        alert('Producto añadido al carrito');
        updateCartDisplay(); // Actualizar la visualización del carrito
    };

    const removeFromCart = (productId) => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = cartItems.filter(item => item.productId !== productId); // Filtrar el producto a eliminar
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Actualizar el localStorage
        updateCartDisplay(); // Actualizar la visualización del carrito
    };

    const updateQuantity = (productId, action) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.productId === productId);

        if (existingProduct) {
            if (action === 'increase') {
                existingProduct.quantity += 1; // Aumentar la cantidad
            } else if (action === 'decrease' && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1; // Disminuir la cantidad
            }
            localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
            updateCartDisplay(); // Actualizar la visualización del carrito
        }
    };

    // Inicializar la visualización del carrito al cargar la página
    updateCartDisplay();
}); 