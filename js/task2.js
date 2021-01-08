(function initTask2() {
    const formTask2 = document.getElementById('formTask2');
    const textareaTask2 = document.getElementById('textTask2');
    const submitTask2 = document.getElementById("submitTask2");
    let data = localStorage.getItem('num23') ? JSON.parse(localStorage.getItem('num23')) : [];

    setDisabledBtn();
    showListParagraph();

    function showListParagraph() {
        if(!data.length) return;

        clearList("paragraph");

        data.forEach((value) => {
            let p = document.createElement('p');
            p.classList.add("paragraph", "m-b-16", "active", `${value % 2 ? 'odd' : 'even'}`);
            p.innerHTML = value;
            formTask2.before(p);
        });
    }

    function clearList(name) {
        const items = document.querySelectorAll(`.${name}`) || [];
        items.forEach((el) => el.remove());
    }

    function setDisabledBtn () {
        submitTask2.setAttribute("disabled", "disabled");
    }

    formTask2.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!textareaTask2.value) return;
        data.push(textareaTask2.value);
        localStorage.setItem('num23', JSON.stringify(data));
        showListParagraph();
        setDisabledBtn();
        textareaTask2.value = '';
    });

    formTask2.addEventListener('reset', (e) => {
        e.preventDefault();
        localStorage.removeItem('num23');
        data = [];
        clearList("paragraph");
        setDisabledBtn();
        textareaTask2.value = '';
    });

    textareaTask2.addEventListener("input", (e) => {
        if(!!e.target.value || submitTask2.hasAttribute("disabled")) {
            submitTask2.removeAttribute("disabled");
        } else {
            submitTask2.setAttribute("disabled", "disabled");
        }
    }, true);
})();
