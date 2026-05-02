let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let result = "";
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

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("clear")) {
            display.textContent = "0";
            firstNumber = "";
            secondNumber = "";
            currentOperator = "";
            result = "";
            shouldResetDisplay = false;
            return;
        }

        if (button.classList.contains("number")) {
            if (shouldResetDisplay) {
                firstNumber = "";
                secondNumber = "";
                currentOperator = "";
                shouldResetDisplay = false;
            }

            if (currentOperator === "") {
                firstNumber += button.textContent;
            } else {
                secondNumber += button.textContent;
            }

            updateDisplay();
            return;
        }

        if (button.classList.contains("operator")) {
            if (firstNumber === "") {
                return;
            }

            if (secondNumber !== "") {
                result = formatResult(
                    operate(currentOperator, Number(firstNumber), Number(secondNumber))
                );

                firstNumber = result;
                secondNumber = "";
            }

            currentOperator = button.dataset.operator;
            shouldResetDisplay = false;
            updateDisplay();
            return;
        }

        if (button.classList.contains("equals")) {
            if (firstNumber === "" || currentOperator === "" || secondNumber === "") {
                return;
            }

            result = formatResult(
                operate(currentOperator, Number(firstNumber), Number(secondNumber))
            );

            display.textContent = result;
            firstNumber = result;
            secondNumber = "";
            currentOperator = "";
            shouldResetDisplay = true;
        }
    });
});