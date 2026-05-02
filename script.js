let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetDisplay = false;
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");


function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if (n2 === 0) return "Error";
    return n1 / n2;
}

function operate(operator, n1, n2) {
    switch (operator) {
        case "+":
            return add(n1, n2);
        case "-":
            return subtract(n1, n2);
        case "*":
            return multiply(n1, n2);
        case "/":
            return divide(n1, n2);
    }
}

function updateDisplay() {
    if (currentOperator === "") {
        display.textContent = firstNumber || "0";
    } else {
        display.textContent = secondNumber || firstNumber;
    }
}

function formatResult(number) {
    if (typeof number === "string") return number;

    return number
        .toPrecision(12)
        .replace(/\.?0+$/, "")
        .slice(0, 12);
}

function clearCalculator() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    shouldResetDisplay = false;
}

function handleNumber(number) {
    if (shouldResetDisplay) {
        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
        shouldResetDisplay = false;
    }

    if (currentOperator === "") {
        firstNumber += number;
    } else {
        secondNumber += number;
    }

    updateDisplay();
}

function handleOperator(operator) {
    if (firstNumber === "") {
        return;
    }

    if (secondNumber !== "") {
        const calculation = operate(
            currentOperator,
            Number(firstNumber),
            Number(secondNumber)
        );

        firstNumber = formatResult(calculation);
        secondNumber = "";
    }

    currentOperator = operator;
    shouldResetDisplay = false;
    updateDisplay();
}

function handleEquals() {
    if (firstNumber === "" || currentOperator === "" || secondNumber === "") {
        return;
    }

    const calculation = operate(
        currentOperator,
        Number(firstNumber),
        Number(secondNumber)
    );

    const result = formatResult(calculation);

    display.textContent = result;
    firstNumber = result;
    secondNumber = "";
    currentOperator = "";
    shouldResetDisplay = true;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("clear")) {
            clearCalculator();
            return;
        }

        if (button.classList.contains("number")) {
            handleNumber(button.textContent);
            return;
        }

        if (button.classList.contains("operator")) {
            handleOperator(button.dataset.operator);
            return;
        }

        if (button.classList.contains("equals")) {
            handleEquals();
        }
    });
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}