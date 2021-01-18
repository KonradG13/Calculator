let calculatorData = {
    display: "",
    operator: "",
    memory: 0
};


let operationsBase = {
    "+": (memory, display) => {return memory + parseInt(display)},
    "-": (memory, display) => {return memory - parseInt(display)},
    "*": (memory, display) => {return memory * parseInt(display)},
    "/": (memory, display) => {return memory / parseInt(display)}
};

let operate = () => {
    checkForZeroDivision();
    checkForEmptyOperator();
    performCalculation();
};

let checkForZeroDivision = () => {
    if(calculatorData.operator === "/" && parseInt(calculatorData.display) === 0) {
        return alert("What are you doing man? Don't divide by 0 on a humble calculator!");
    }
};

let checkForEmptyOperator = () => {
    if(calculatorData.operator === "") {
        calculatorData.memory = parseInt(calculatorData.display);
        calculatorData.display = ""
        return;
    }
};

let performCalculation = () => {
    if(checkIfCalculationViable()){return}
    calculatorData.memory = operationsBase[calculatorData.operator](calculatorData.memory, calculatorData.display);
    calculatorData.operator = "";
    calculatorData.display = "";

};

let checkIfCalculationViable = () => {
    return ((calculatorData.operator === "/" && calculatorData.display === "0") || (calculatorData.operator === "")) ? true:false;
}


let inputtingDisplay = (pressedNumberKey) => {
    calculatorData
    calculatorData.display.push(pressedNumberKey);
};

let clearCalculator = () => {
    calculatorData.display = "";
    calculatorData.operator = "";
    calculatorData.memory = 0;
};
