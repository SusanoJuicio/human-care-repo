import { agregarAFavoritos } from './favoritos.js';

// ... en tu manejador de eventos del corazón ...
hearthIcon.addEventListener('click', () => {
    const producto = {
        id: productoId,
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenProducto
    };
    agregarAFavoritos(producto);
}); 
let favoritos = [];

export function agregarAFavoritos(producto) {
    if (!favoritos.some(fav => fav.id === producto.id)) {
        favoritos.push(producto);
        actualizarFavoritosUI();
    }
}

export function quitarDeFavoritos(productoId) {
    favoritos = favoritos.filter(fav => fav.id !== productoId);
    actualizarFavoritosUI();
}

function actualizarFavoritosUI() {
    const favoritosList = document.getElementById('favoritosList');
    const contadorFavoritos = document.querySelector('.favoritos-count');
    
    // Actualizar contador
    contadorFavoritos.textContent = favoritos.length;
    
    // Actualizar lista desplegable
    if (favoritos.length === 0) {
        favoritosList.innerHTML = '<li class="dropdown-item-text text-center">No hay favoritos</li>';
        return;
    }

    favoritosList.innerHTML = favoritos.map(producto => `
        <li class="dropdown-item d-flex align-items-center gap-2">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="favorito-thumb" />
            <div class="flex-grow-1">
                <div>${producto.nombre}</div>
                <div class="text-primary">$${producto.precio}</div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="quitarDeFavoritos(${producto.id})">
                <i class="bi bi-trash"></i>
            </button>
        </li>
    `).join('');
} 