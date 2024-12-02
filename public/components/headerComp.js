export const headerComp = `
    <nav class="nav_container">
        <section class="nav_section">
            <div class="nav_wrapper">
                <div class="nav">
                    <a href="index.html" class="nav_brand">
                        <img class="nav_logo" src="/images/Logo.webp" alt="Logo de la empresa">
                    </a>
                    <h1 class="titulo">HumanCare</h1>

                    <ul class="nav_list_lis">
                        <li class="nav_list_li dropdown">
                            <button class="nav_list_link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/images/trophy.svg" alt="Insignias">
                            </button>
                            <div class="dropdown-menu dropdown-menu-end" id="insigniasList">
                                <div class="dropdown-header">Mis Insignias</div>
                                <div class="insignias-empty text-center p-3">
                                    No hay insignias obtenidas
                                </div>
                            </div>
                        </li>
                        <li class="nav_list_li dropdown">
                            <button class="nav_list_link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/images/hearth.svg" alt="Deseos">
                            </button>
                            <div class="dropdown-menu dropdown-menu-end" id="favoritosList">
                                <div class="dropdown-header">Mis Favoritos</div>
                                <div class="favoritos-empty text-center p-3">
                                    No hay productos en favoritos
                                </div>
                            </div>
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