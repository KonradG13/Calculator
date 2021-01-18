let calculatorData = {
    display: 0,
    operator: "",
    memory: 0,
    displayAsString: "0"
};

let operationsBase = {
    "+": (memory, display) => {return memory + display},
    "-": (memory, display) => {return memory - display},
    "*": (memory, display) => {return memory * display},
    "/": (memory, display) => {return memory / display}
};

let operate = () => {
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
    if(calculatorData.operator === "") {
        calculatorData.memory = calculatorData.display;
        calculatorData.display = 0;
        calculatorData.displayAsString = "";
        return;
    };
};

let performCalculation = () => {
    if(checkIfCalculationViable()){return};
    calculatorData.memory = operationsBase[calculatorData.operator](calculatorData.memory, calculatorData.display);
    calculatorData.operator = "";
    calculatorData.display = 0;
    calculatorData.displayAsString = "";
};

let checkIfCalculationViable = () => {
    return ((calculatorData.operator === "/" && calculatorData.display == 0) || (calculatorData.operator === "")) ? true:false;
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
    return calculatorData.displayAsString.length() == 10 ? true:false
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
};
