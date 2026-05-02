let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let result = "";
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
            return divide(n1, n2).toFixed(9);
    }
}

function updateDisplay() {
    display.textContent = firstNumber + currentOperator + secondNumber;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        if (button.classList.contains("clear")) {
            display.textContent = 0;
            firstNumber = "";
            secondNumber = "";
            currentOperator = "";
            result = "";
            return;
        }
        if (button.classList.contains("number")) {

            if (currentOperator === "") {
                firstNumber += button.textContent;
            } else {
                secondNumber += button.textContent;
            }

            updateDisplay();

        } else if (button.classList.contains("operator")) {

            if (firstNumber === "") {
                return;
            }

            currentOperator = button.dataset.operator;
            updateDisplay();

        } else if (button.classList.contains("equals")) {

            if (firstNumber === "" || currentOperator === "" || secondNumber === "") {
                return;
            }

            result = operate(currentOperator, Number(firstNumber), Number(secondNumber));
            display.textContent = result;
            firstNumber = result.toString();
            secondNumber = "";
            currentOperator = "";
        }

    });
});