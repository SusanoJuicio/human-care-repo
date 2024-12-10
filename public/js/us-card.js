const fetchProducts = async () => {
    try {
        const response = await fetch('../../db/us.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const usSection = document.getElementById('us')
const us = fetchProducts();
us.then(data => {
    data.forEach(element => {
        const link = document.createElement('a')

        link.href = element.link
        link.setAttribute('target', '_blank')
        link.className = 'card-link'

        const card = document.createElement('div')
        card.className = 'card'

        if (element.url !== '') {
            card.innerHTML = `<img src="${element.url}" alt="imagen">`;
        } else {
            card.style.background = '#3E85A4'
        }

        const hoverText = document.createElement('div');
        hoverText.className = 'hover-text';
        hoverText.innerText = element.nombre;
        card.appendChild(hoverText);

        link.appendChild(card);
        usSection.appendChild(link);
    });
})
