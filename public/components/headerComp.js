export const headerComp = `
    <nav class="nav_container">
        <section class="nav_section">
            <div class="nav_wrapper">
                <div class="nav">
                    <a href="index.html" class="nav_brand">
                        <img class="nav_logo" src="/images/Logo.webp" alt="Logo de la empresa">
                    </a>
                    
                    <!-- Botón hamburguesa para móvil -->
                    <button class="nav_toggle" aria-label="Abrir menú">
                        <span class="hamburger"></span>
                    </button>

                    <div class="nav_search">
                        <input 
                            type="text" 
                            class="nav_search_input" 
                            placeholder="Buscar Producto"
                            aria-label="Buscar producto"
                        >
                        <button class="nav_search_button" aria-label="Realizar búsqueda">
                            <svg class="nav_search_icon" aria-hidden="true" viewBox="0 0 24 24">
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>

                    <ul class="nav_list_lis">
                        <li class="nav_list_li">
                            <a href="insignias.html" aria-label="Insignias">
                                <img src="/images/trophy.svg" alt="Insignias">
                            </a>
                        </li>
                        <li class="nav_list_li">
                            <a href="#" aria-label="Lista de deseos">
                                <img src="/images/hearth.svg" alt="Deseos">
                            </a>
                        </li>
                        <li class="nav_list_li">
                            <a href="carrito.html" aria-label="Carrito de compras">
                                <img src="/images/cart.svg" alt="Carrito">
                            </a>
                        </li>
                        <li class="nav_list_li">
                            <a href="perfil.html" aria-label="Perfil de usuario">
                                <img src="/images/user.svg" alt="Usuario">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="nav_foot">
                <ul class="nav_list">
                    <li class="nav_items">
                        <a href="nosotros.html" class="nav_links">Nosotros</a>
                    </li>
                    <li class="nav_items">
                        <a href="catalogo.html" class="nav_links">Catálogo</a>
                    </li>
                    <li class="nav_items">
                        <a href="donaciones.html" class="nav_links">Donaciones</a>
                    </li>
                    <li class="nav_items">
                        <a href="#footer" class="nav_links">Contáctanos</a>
                    </li>
                </ul>
            </div>
        </section>
    </nav>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const navToggle = document.querySelector('.nav_toggle');
            const navList = document.querySelector('.nav_list');
            const navListLis = document.querySelector('.nav_list_lis');
            
            navToggle?.addEventListener('click', () => {
                navList.classList.toggle('nav_list--visible');
                navListLis.classList.toggle('nav_list_lis--visible');
            });
        });
    </script>
`;