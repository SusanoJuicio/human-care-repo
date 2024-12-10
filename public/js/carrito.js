

document.addEventListener('DOMContentLoaded', () => {
    const carritoContenedor = document.getElementById('carrito-items');
    const total2 = document.getElementById('total');
    const totalPriceElement = document.getElementById('total-price'); // Elemento para mostrar el total
    const pagarButton = document.getElementById('pagar-button');
    const h2 = document.getElementById("h2")
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
    const getCartItems = () => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    };
    const updateCartDisplay = async () => {
        carritoContenedor.innerHTML = ''; // Limpiar la lista antes de mostrar los elementos
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const products = await fetchProducts(); // Obtener todos los productos

        let total = 0; // Inicializar el total

        // Referencias a los elementos del total y el botón de pagar
        const totalPriceElement = document.getElementById('total-price');
        const pagarButton = document.getElementById('pagar-button');

        if (cartItems.length === 0) {
            carritoContenedor.innerHTML = '<li>No hay productos en el carrito.</li>'; // Mensaje cuando el carrito está vacío
            carritoContenedor.className = 'li';
            totalPriceElement.textContent = total; // Actualizar el total a 0
            totalPriceElement.style.display = 'none'; // Ocultar el total
            pagarButton.style.display = 'none'; // Ocultar el botón de pagar
            total2.style.display = 'none';
            h2.style.display = "none";
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

            totalPriceElement.textContent = total.toFixed(2); // Actualizar el total en el DOM
            totalPriceElement.style.display = 'block'; // Mostrar el total
            pagarButton.style.display = 'block'; // Mostrar el botón de pagar
            total2.style.display = 'block'
            h2.style.display = "block";
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

    const processPayment = async () => {
        const cartItems = getCartItems();
        const encryptedUser = localStorage.getItem('user'); // Obtener el usuario cifrado

        if (!encryptedUser) {
            Swal.fire({
                title: '¡Atención!',
                text: 'No hay Usuario Autenticado',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                background: '#D9D9D9', // Color de fondo
                color: '#3E85A4', // Color del texto
                iconColor: '#FF9800', // Color del icono (naranja para advertencia)
                customClass: {
                    confirmButton: 'btn-confirm' // Clase personalizada para el botón
                }
            });
            return;
        }
        const userId = localStorage.getItem("userId") // Obtener el ID del usuario descifrado

        for (const item of cartItems) {
            console.log('Enviando productId:', item.productId);
            const response = await fetch('http://localhost:7777/products/purchase', {
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

            const responseText = await response.text(); // Obtener la respuesta como texto
            console.log('Respuesta del servidor:', responseText); // Imprimir la respuesta

            if (!response.ok) {
                const error = JSON.parse(responseText);
                Swal.fire({
                    title: '¡Atención!',
                    text: 'Error al procesar la compra',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    background: '#D9D9D9', // Color de fondo
                    color: '#3E85A4', // Color del texto
                    iconColor: '#FF9800', // Color del icono (naranja para advertencia)
                    customClass: {
                        confirmButton: 'btn-confirm' // Clase personalizada para el botón
                    }
                });
                return; // Salir si hay un error
            }
        }

        Swal.fire({
            title: '¡Éxito!',
            text: 'Compra realizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#D9D9D9', // Color de fondo
            color: '#3E85A4', // Color del texto
            iconColor: '#4CAF50', // Color del icono (verde para éxito)
            customClass: {
                confirmButton: 'btn-confirm'// Clase personalizada para el botón
            }
        });
        localStorage.removeItem('cart'); // Limpiar el carrito después de la compra
        updateCartDisplay(); // Actualizar la visualización del carrito
    };

    pagarButton.addEventListener('click', processPayment);
    updateCartDisplay();
}); 
