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
        const a = document.createElement("a");
        a.href = "./donaciones.html";
        a.classList.add("causa-link");

        const cardCausaContent = `
        <div class="cause">
            <div class="cause2">
                <h2 class="title-cause">${element.nombre}</h2>
                <div class="causa-contain"> 
                    
                    <img class="img-causes" src="${element.img}" alt="Causa Imagen"/>
                    <p class="desc-causes">${element.descripcion}</p>
                </div>
                
            </div>
        </div>
        `;
        a.innerHTML = cardCausaContent;
        cardCausa.appendChild(a);
        seccion.appendChild(cardCausa);

    });
    RenderBtn()
});

const RenderBtn = () => {
    const button = document.createElement("button");
    button.classList.add("btnDonar");
    button.innerText = "Donar";

    const a = document.createElement("a");
    a.classList.add("aDonar")
    a.href = "./donaciones.html";
    a.appendChild(button);

    seccion.appendChild(a);
}
