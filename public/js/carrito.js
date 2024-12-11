document.addEventListener('DOMContentLoaded', () => {
    const carritoContenedor = document.getElementById('carrito-items');
    const total2 = document.getElementById('total');
    const totalPriceElement = document.getElementById('total-price');
    const pagarButton = document.getElementById('pagar-button');
    const h2 = document.getElementById('h2')
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://humancare-backend.onrender.com/products');
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error al obtener productos:', err);
            return [];
        }
    };
    const getCartItems = () => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    };
    const updateCartDisplay = async () => {
        carritoContenedor.innerHTML = '';
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const products = await fetchProducts();

        let total = 0;

        const totalPriceElement = document.getElementById('total-price');
        const pagarButton = document.getElementById('pagar-button');

        if (cartItems.length === 0) {
            carritoContenedor.innerHTML = '<li>No hay productos en el carrito.</li>';
            carritoContenedor.className = 'li';
            totalPriceElement.textContent = total;
            totalPriceElement.style.display = 'none';
            pagarButton.style.display = 'none';
            total2.style.display = 'none';
            h2.style.display = 'none';
        } else {
            cartItems.forEach(cartItem => {
                const product = products.find(p => p.customId === parseInt(cartItem.productId));

                if (product) {
                    const quantity = cartItem.quantity;
                    const itemTotal = product.price * quantity;
                    total += itemTotal;

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

            totalPriceElement.textContent = total.toFixed(2);
            totalPriceElement.style.display = 'block';
            pagarButton.style.display = 'block';
            total2.style.display = 'block'
            h2.style.display = 'block';
        }

        addCartEventListeners();
    };

    const addCartEventListeners = () => {
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault()
                const productId = event.target.getAttribute('data-id');
                removeFromCart(productId);
            });
        });

        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault()
                const productId = event.target.getAttribute('data-id');
                updateQuantity(productId, 'increase');
            });
        });

        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault()
                const productId = event.target.getAttribute('data-id');
                updateQuantity(productId, 'decrease');
            });
        });
    };

    const removeFromCart = (productId) => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = cartItems.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartDisplay();
    };

    const updateQuantity = (productId, action) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.productId === productId);

        if (existingProduct) {
            if (action === 'increase') {
                existingProduct.quantity += 1;
            } else if (action === 'decrease' && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    };

    const processPayment = async () => {
        const cartItems = getCartItems();
        const encryptedUser = localStorage.getItem('user');

        if (!encryptedUser) {
            Swal.fire({
                title: '¡Atención!',
                text: 'No hay Usuario Autenticado',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                background: '#D9D9D9',
                color: '#3E85A4',
                iconColor: '#FF9800',
                customClass: {
                    confirmButton: 'btn-confirm'
                }
            });
            return;
        }
        const userId = localStorage.getItem("userId")

        for (const item of cartItems) {
            const response = await fetch('https://humancare-backend.onrender.com/products/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: item.productId,
                    quantity: item.quantity,
                }),
            });

            const responseText = await response.text();

            if (!response.ok) {
                const error = JSON.parse(responseText);
                Swal.fire({
                    title: '¡Atención!',
                    text: 'Error al procesar la compra',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    background: '#D9D9D9',
                    color: '#3E85A4',
                    iconColor: '#FF9800',
                    customClass: {
                        confirmButton: 'btn-confirm'
                    }
                });
                return;
            }
        }

        Swal.fire({
            title: '¡Éxito!',
            text: 'Compra realizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9',
            color: '#3E85A4',
            iconColor: '#4CAF50',
            customClass: {
                confirmButton: 'btn-confirm'
            }
        });
        localStorage.removeItem('cart');
        updateCartDisplay();
    };

    pagarButton.addEventListener('click', processPayment);
    updateCartDisplay();
}); 
