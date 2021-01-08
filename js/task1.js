const textareaTask1 = document.getElementById("textTask1");
const buttonTask1 = document.getElementById("buttonTask1");

buttonTask1.addEventListener("click", getAnswer);

function getAnswer() {
    if(!textareaTask1.value) {
        textareaTask1.value = `You haven't entered an app to speed up collaboration - I'll deliver the text myself.`;
    }
    const objSymbol = maxSymbol(textareaTask1.value);
    const answer = document.querySelector(".answer");
    if(answer) answer.remove();
    let div = document.createElement("div");
    div.innerHTML = `The character "${Object.keys(objSymbol)[0]}" in a string (case insensitive) found ${Object.values(objSymbol)[0]} times.`;
    div.classList.add("answer", "m-b-16");
    textareaTask1.before(div);
};

function maxSymbol(str) {
    let arrSymbol = str.split('');
    const arrSmallSymbol = arrSymbol.map(s => s.toLowerCase());
    let objKeys = [];
    let objCount = [];

    arrSmallSymbol.forEach(symbol => {
        if(!symbol) return;

        if(!objKeys.includes(symbol)) {
            objKeys.push(symbol);
            objCount.push({[symbol]: 0});
        }
        let element = objCount.find(item => Object.keys(item)[0] === symbol);
        element[symbol]++;
    });
    const maxCountObj = objCount.reduce((max, cur) => Object.values(max)[0] > Object.values(cur)[0] ? max : cur);
    return maxCountObj;
};
