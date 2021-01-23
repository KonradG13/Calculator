let operationsList = ["+", "-", "*", "/"];
let numbersList = [7,8,9,4,5,6,1,2,3,0,"."];
let functionsList = ["AC", "DEL"];
let equals = "=";
let functionsAssignment = {
    "AC": clearCalculator,
    "DEL": backspaceInDisplay
};

let calculatorBoard = document.querySelector('#operationsBoard');
let displayScreen = document.querySelector('#display');
let memoryScreen = document.querySelector('#memory');
let maxMemoryLength = 36;


let createOperationsButton = (buttonValue, buttonClass) => {
    let thisButton = document.createElement('button');
    thisButton.classList.add(buttonClass);
    thisButton.innerHTML = buttonValue;
    thisButton.setAttribute('type', 'button');
    thisButton.setAttribute('value', buttonValue);
    addOperationsListener(thisButton, buttonValue);
    addToCalculator(thisButton);
};

let addOperationsListener = (thisButton, symbol) => {
    thisButton.addEventListener('click', ()=>{
        calculatorData.temporaryOperator = symbol;
        performOperation();
        calculatorData.operator = symbol;
        updateScreens();
    });
};

let addToCalculator = (button) =>{
    calculatorBoard.appendChild(button);
};

let createNumbersButton = (buttonValue, buttonClass) => {
    let thisButton = document.createElement('button');
    thisButton.classList.add(buttonClass);
    thisButton.innerHTML = buttonValue;
    thisButton.setAttribute('type', 'button');
    thisButton.setAttribute('value', buttonValue);
    addNumbersListener(thisButton, buttonValue);
    addToCalculator(thisButton);
};

let addNumbersListener = (thisButton, symbol) => {
    thisButton.addEventListener('click', ()=>{
        inputtingDisplay(symbol);
        updateScreens(); 
    });
};

let createFunctionsButton = (buttonValue, buttonClass) => {
    let thisButton = document.createElement('button');
    thisButton.classList.add(buttonClass);
    thisButton.innerHTML = buttonValue;
    thisButton.setAttribute('type', 'button');
    thisButton.setAttribute('value', buttonValue);
    addFunctionsListener(thisButton);
    addToCalculator(thisButton);
};

let addFunctionsListener = (thisButton) => {
    thisButton.addEventListener('click', ()=>{
        functionsAssignment[thisButton.value]();
        updateScreens(); 
    });
};

let createEqualsButton = (buttonValue, buttonClass) => {
    let thisButton = document.createElement('button');
    thisButton.classList.add(buttonClass);
    thisButton.innerHTML = buttonValue;
    thisButton.setAttribute('type', 'button');
    thisButton.setAttribute('value', buttonValue);
    addEqualsListener(thisButton);
    addToCalculator(thisButton);
};

let addEqualsListener = (thisButton) => {
    thisButton.addEventListener('click', ()=>{
        performOperation();
        updateScreens(); 
    });
};

let updateScreens = () => {
    displayScreen.innerHTML = calculatorData.displayAsString;
    let memoryString = calculatorData.memory + ' ' + calculatorData.operator;
    if (memoryString.length>36) {
        let shortenedMemoryString = "..."+memoryString.slice[3,35];
        memoryScreen.innerHTML = shortenedMemoryString;
    }
    else {
        memoryScreen.innerHTML = memoryString;
    }};


operationsList.forEach(operationsign => {
    createOperationsButton(operationsign, 'operationsButton');
});

numbersList.forEach(numbersign => {
    createNumbersButton(numbersign, 'numbersButton');
});

functionsList.forEach(functionsign => {
    createFunctionsButton(functionsign, 'functionsButton');
});

createEqualsButton(equals, 'equalButton');
