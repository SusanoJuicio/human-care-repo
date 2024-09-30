const fetchProducts = async () => {
    try {
        const response = await fetch("../../db/causas.json");
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}


const seccion = document.getElementById("causas");
const causas = fetchProducts();

causas.then(data => {
    data.forEach(element => {
        const cardCausa = document.createElement("div");
        cardCausa.classList.add("cardCausa");

        const a = document.createElement("a");
        a.href = "./donaciones.html";
        a.classList.add("causa-link");

        const cardCausaContent = `
            <div class="title-container">
                <h2 class="title-causa">${element.nombre}</h2>
            </div>
            <div class="causa-contain">
                <img class="img-causas" src="${element.img}" alt="Causa Imagen"/>
                <div class="causa-description">
                    <p class="causas-p">${element.descripcion}</p>
                </div>
            </div>
        `;
        a.innerHTML = cardCausaContent;
        cardCausa.appendChild(a);
        seccion.appendChild(cardCausa);

    });
    Render()
});

const Render = () => {
    const button = document.createElement("button");
    button.classList.add("btnDonar");
    button.innerText = "Donar Ahora";

    const a = document.createElement("a");
    a.classList.add("aDonar")
    a.href = "./donaciones.html";
    a.appendChild(button);

    seccion.appendChild(a);
}
