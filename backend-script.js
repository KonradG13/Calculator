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
    calculatorData.memoryUsed = true;
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
    calculatorData.display = convertStringToIntOrFloat(calculatorData.displayAsString);
};

let convertStringToIntOrFloat = (numberAsString) => {
    return numberAsString.includes(".") ? parseFloat(numberAsString):parseInt(numberAsString);
};

let displayLengthCheck = () => {
    return calculatorData.displayAsString.length == maxDisplayLength ? true:false;
};

let backspaceInDisplay = () => {
    calculatorData.displayAsString = calculatorData.displayAsString.slice(0,-1);
    calculatorData.display = convertStringToIntOrFloat(calculatorData.displayAsString);
};

let clearCalculator = () => {
    calculatorData.display = 0;
    calculatorData.operator = "";
    calculatorData.memory = 0;
    calculatorData.displayAsString = "";
    calculatorData.memoryUsed = false;
    calculatorData.temporaryOperator = "";
};