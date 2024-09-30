
const fetchProducts = async () => {
    try {
        const response = await fetch("../../db/product.json");
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const seccion = document.getElementById("cards")
const products = fetchProducts();

products.then(data => {
    data.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("key", producto.id);

        const link = document.createElement("a");
        link.href = "./catalogo.html";

        const cardContent = `
            <div class="div-img">

            </div>
            <h3 class="card-name">${producto.nombre}</h3>
        `;

        link.innerHTML = cardContent;

        const mainCard = document.createElement("div");
        mainCard.classList.add("main-Card");
        mainCard.innerHTML = `
            <img src="../images/hearth.svg" alt="hearth">
            <button class="add-Cart">Añadir al carrito</button>
            <p class="card-Price">$${producto.precio}</p>

        `;

        card.appendChild(link);
        card.appendChild(mainCard);

        seccion.appendChild(card);
    });
});