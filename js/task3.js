const getAllUrlParams = (url) => {
    let queryString = url.split('?')[1];

    const obj = {};

    if(queryString) {
        queryString = queryString.split('#')[0];

        const arr = queryString.split('&');

        for (let i = 0; i < arr.length; i++) {
            const a = arr[i].split('=');
            let paramName = a[0];
            let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            paramName = paramName.toLowerCase();

            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            if(!obj[paramName]) {
                obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                obj[paramName] = [obj[paramName]];
                obj[paramName].push(paramValue);
            } else {
                obj[paramName].push(paramValue);
            }
        }
    }

    return obj;
}

const isEmptyObject = (obj) => {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

(function initTask3() {
    const formTask3 = document.getElementById('formTask3');
    const urlTask3 = document.getElementById('urlTask3');
    const boxTask3 = document.getElementById('boxTask3');

    formTask3.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!urlTask3.value) return;

        let resultObj = getAllUrlParams(urlTask3.value);
        if(isEmptyObject(resultObj)) {
            resultObj = "Not found";
        }
        boxTask3.innerHTML = `<div class="fw-bolder center m-b-8">Result:</div><div class="resultCode m-b-16">${JSON.stringify(resultObj)}</div>`;
    });
})();
