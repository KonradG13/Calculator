//variablesDeclaration
let calculatorData = {
    display: 0,
    operator: "",
    memory: 0,
    displayAsString: "",
    memoryUsed: false,
    temporaryOperator: ""
};

let operationsBase = {
    "+": (memory, display) => {return memory + display},
    "-": (memory, display) => {return memory - display},
    "*": (memory, display) => {return memory * display},
    "/": (memory, display) => {return memory / display}
};

let maxDisplayLength = 10;

//back-end functions - engine of calculator
let performOperation = () => {
    checkForZeroDivision();
    checkForEmptyOperator();
    performCalculation();
};

let checkForZeroDivision = () => {
    if(calculatorData.operator === "/" && calculatorData.display == 0) {
        return alert("What are you doing man? Don't divide by 0 on a humble calculator!");
    };
};

let checkForEmptyOperator = () => {
    if(calculatorData.operator === "" && calculatorData.memoryUsed === false) {
        actionForFirstTimeEmptyOperator();
        return;
    }
    else if (calculatorData.operator === "" ){
        ActionForEmptyOperator();
        
    } 
};
let actionForFirstTimeEmptyOperator = ()=> {
    calculatorData.memory = calculatorData.display;
    clearDisplay();
    calculatorData.memoryUsed = true
};

let ActionForEmptyOperator = () => {
    calculatorData.operator = calculatorData.temporaryOperator;
};

let clearDisplay = ()=> {
    calculatorData.display = 0;
    calculatorData.displayAsString = "";
}

let performCalculation = () => {
    if(checkIfCalculationViable()){return};
    calculatorData.memory = operationsBase[calculatorData.operator](calculatorData.memory, calculatorData.display);
    calculatorData.operator = "";
    clearDisplay();
};

let checkIfCalculationViable = () => {
    return ((calculatorData.operator === "/" && calculatorData.display == 0) || (calculatorData.operator === "" || calculatorData.displayAsString ==="")) ? true:false;
};

let inputtingDisplay = (pressedNumberKey) => {
    if(displayLengthCheck()){return alert("Too many digits!")};
    calculatorData.displayAsString = calculatorData.displayAsString.concat(pressedNumberKey);
    calculatorData.display = convertStringToIntOrFloat(calculatorData.displayAsString)
};

let convertStringToIntOrFloat = (numberAsString) => {
    return numberAsString.includes(".") ? parseFloat(numberAsString):parseInt(numberAsString);
};

let displayLengthCheck = () => {
    return calculatorData.displayAsString.length == maxDisplayLength ? true:false
};

let backspaceInDisplay = () => {
    calculatorData.displayAsString = calculatorData.displayAsString.slice(0,-1);
    calculatorData.display = convertStringToIntOrFloat(calculatorData.displayAsString)
};

let clearCalculator = () => {
    calculatorData.display = 0;
    calculatorData.operator = "";
    calculatorData.memory = 0;
    calculatorData.displayAsString = "";
    calculatorData.memoryUsed = false;
    calculatorData.temporaryOperator = "";
};

//front-end - calculator design setup

let operationsList = ["+", "-", "*", "/"];
let numbersList = [7,8,9,4,5,6,1,2,3,0,"."];
let functionsList = ["AC", "DEL"];
let equals = "=";
let functionsAssignment = {
    "AC": clearCalculator,
    "DEL": backspaceInDisplay
}

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
    calculatorBoard.appendChild(button)
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
    let memoryString = calculatorData.memory + ' ' + calculatorData.operator 
    if (memoryString.length>36) {
        let shortenedMemoryString = "..."+memoryString.slice[3,35]
        memoryScreen.innerHTML = shortenedMemoryString
    }
    else {
        memoryScreen.innerHTML = memoryString
    }};


operationsList.forEach(operationsign => {
    createOperationsButton(operationsign, 'operationsButton');
});

numbersList.forEach(numbersign => {
    createNumbersButton(numbersign, 'numbersButton')

});

functionsList.forEach(functionsign => {
    createFunctionsButton(functionsign, 'functionsButton')
});

createEqualsButton(equals, 'equalButton');


