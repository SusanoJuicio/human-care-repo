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
                        <li class="nav_list_li">
                            <a href="insignias.html" aria-label="Insignias">
                                <img src="/images/trophy.svg" alt="Insignias">
                            </a>
                        </li>
                        <li class="nav_list_li nav_favoritos">
                            <a href="#" aria-label="Lista de deseos">
                                <img src="/images/hearth.svg" alt="Deseos">
                            </a>
                            <div class="dropdown_favorites">
                                <ul>
                                    <li>Producto 1</li>
                                    <li>Producto 2</li>
                                    <li>Producto 3</li>
                                </ul>
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
            const favoritosButton = document.querySelector('.nav_favoritos');

            navToggle?.addEventListener('click', () => {
                navList.classList.toggle('nav_list--visible');
                navListLis.classList.toggle('nav_list_lis--visible');
            });

            favoritosButton?.addEventListener('mouseenter', () => {
                favoritosButton.querySelector('.dropdown_favorites').classList.add('visible');
            });

            favoritosButton?.addEventListener('mouseleave', () => {
                favoritosButton.querySelector('.dropdown_favorites').classList.remove('visible');
            });
        });
    </script>
`;
