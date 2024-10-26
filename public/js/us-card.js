const usSection = document.getElementById("us");

const imagenes = [
    { url: "../images/us/ivan-img.png", nombre: "Iván", link: "https://www.linkedin.com/in/ivanacu2001/" },
    { url: "../images/us/talia-img.jpg", nombre: "Talia", link: "https://www.linkedin.com/in/taliaivonneojeda/" },
    { url: "../images/us/maxi-img.jpg", nombre: "Maxi", link: "https://www.linkedin.com/in/maximiliano-lucas-martinez-72921a297/" },
    { url: "../images/us/seba-img.jpg", nombre: "Seba", link: "https://www.linkedin.com/in/sebasti%C3%A1n-petersen-308a26240/" },
    { url: "", nombre: "Brisa", link: "#" },
    { url: "", nombre: "Karen", link: "https://www.linkedin.com/in/karen-marlene-licera-948719241/" }
];

for (let i = 0; i < imagenes.length; i++) {
    let link = document.createElement("a");
    link.href = imagenes[i].link;
    link.setAttribute("target", "_blank")
    link.className = "card-link";

    let card = document.createElement("div");
    card.className = "card";

    if (imagenes[i].url != "") {
        card.innerHTML = `<img src="${imagenes[i].url}" alt="imagen">`;
    } else {
        card.style.background = "#3E85A4";
    }

    const hoverText = document.createElement("div");
    hoverText.className = "hover-text";
    hoverText.innerText = imagenes[i].nombre;
    card.appendChild(hoverText);

    link.appendChild(card);
    usSection.appendChild(link);
}
