const request = async (url) => {
    try {
        await fetch(url)
            .then((response) => {
                return response.text();
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
};

const b64DecodeUnicode = (str) => {
    return decodeURIComponent(
        atob(str)
            .split('')
            .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
};

const createItemProduct = (data) => {
    let strHTML = '';
    data.forEach((elem) => (strHTML += tpl(elem)));
    const boxTask4 = document.getElementById('boxTask4');
    boxTask4.innerHTML = strHTML;
};

const tpl = (data) => {
    return !data
        ? ``
        : `<article>
        <div class="item-wrap">
            <div class="item-id">#${data.id}</div>
            <div class="item-title">${data.title}</div>
            <div class="item-sku">${data.sku}</div>
            <img src="${data.image}" alt="${data.title}" />
            <div class="item-title-options">PRODUCT OPTIONS:</div>
            <ul class="item-options">
                <li>Metal type: ${data.options[0].metal_type}</li>
                <li>Metal color: ${data.options[0].metal_color}</li>
                <li>Stone shape: ${data.options[0].stone_shape}</li>
                <li>Gemstone color: ${data.options[0].gemstone_color}</li>
            </ul>
            <div class="item-price">${Number(data.price).toFixed(2)} ${data.currency}</div>
        </div>
    </article>`;
};

(function initTask4() {
    const url = 'http://54.39.188.42/';
    request(url);
})();