const fetchProducts = async () => {
    try {
        const response = await fetch("../../db/user.json");
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const seccion = document.getElementById("userInfo")
const products = fetchProducts();

products.then(data => {
    data.forEach(producto => {
        const card = document.createElement("div");
        const link = document.createElement("a");
        link.href = "./perfil.html";
        card.classList.add("card");
        card.setAttribute("key", producto.id);


        const cardContent = `
            <h2 class=>Mi Perfil</h2>
            <p><strong>Nombre:</strong> ${producto.nombre}</p>
            <p><strong>Apellido:</strong> ${producto.apellido}</p>
            <p><strong>DNI:</strong> ${producto.dni}</p>
            <p><strong>Teléfono:</strong> ${producto.telefono}</p>
            `;

        link.innerHTML = cardContent;
        card.appendChild(link);
        seccion.appendChild(card);
    });
});