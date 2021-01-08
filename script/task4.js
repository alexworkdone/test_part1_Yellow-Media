;
const boxTask4 = document.getElementById('boxTask4');

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

try {
    fetch("http://54.39.188.42/")
        .then((response) => {
            return response.text()
        })
        .then((text) => {
            return JSON.parse(b64DecodeUnicode(text));
        })
        .then((json) => {
            createItemProduct(json);
        });
} catch (error) {
    console.error(error);
}

function createItemProduct(json) {
    let strHTML = '';

    json.forEach(elem => {
        let template = `<article>
            <div class="item-wrap">
                <div class="item-id">#${elem.id}</div>
                <div class="item-title">${elem.title}</div>
                <div class="item-sku">${elem.sku}</div>
                <img src="${elem.image}" alt="${elem.title}" />
                <div class="item-title-options">PRODUCT OPTIONS:</div>
                <ul class="item-options">
                    <li>Metal type: ${elem.options[0].metal_type}</li>
                    <li>Metal color: ${elem.options[0].metal_color}</li>
                    <li>Stone shape: ${elem.options[0].stone_shape}</li>
                    <li>Gemstone color: ${elem.options[0].gemstone_color}</li>
                </ul>
                <div class="item-price">${Number(elem.price).toFixed(2)} ${elem.currency}</div>
            </div>
        </article>`;

      strHTML += template;
    });

    boxTask4.innerHTML = strHTML;
}
