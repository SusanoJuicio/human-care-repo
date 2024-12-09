document.addEventListener('DOMContentLoaded', () => {
    const toggleFavoritesButton = document.getElementById('heart-icon');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarButton = document.getElementById('close-sidebar');
    const wishlistItems = document.getElementById('wishlist-items');
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
    const updateWishlistDisplay = async () => {
        wishlistItems.innerHTML = ''; // Limpiar la lista antes de mostrar los elementos
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const products = await fetchProducts(); // Obtener todos los productos

        if (wishlist.length === 0) {
            wishlistItems.innerHTML = '<li>No hay productos en la lista de deseos.</li>';
        } else {
            wishlist.forEach(productId => {
                const product = products.find(p => p.customId === parseInt(productId)); // Buscar el producto por customId

                if (product) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div class="wishlist-item">
                            <img src="${product.imageUrl}" alt="${product.name}" class="wishlist-item-image">
                            <div class="wishlist-item-info">
                                <h3>${product.name}</h3>
                                <p>Precio: $${product.price}</p>
                            </div>
                            <button class="remove-from-wishlist" data-id="${product.customId}">X</button>
                        </div>
                    `;
                    wishlistItems.appendChild(listItem);
                }
            });
        }
        const removeButtons = document.querySelectorAll('.remove-from-wishlist');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                removeFromWishlist(productId);
            });
        });
    };
    const removeFromWishlist = (productId) => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(id => id !== productId); // Filtrar el producto a eliminar
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Actualizar el localStorage
        updateWishlistDisplay(); // Actualizar la visualización de la wishlist
    };
    toggleFavoritesButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace
        sidebar.classList.toggle('active'); // Agrega o quita la clase 'active' para mostrar/ocultar la barra lateral
        updateWishlistDisplay();
    });

    closeSidebarButton.addEventListener('click', () => {
        sidebar.classList.remove('active'); // Cierra la barra lateral
    });
});
