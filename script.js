function addition(a, b) {
    return a + b;
}
function subtraction(a, b) {
    return a - b;
}
function multiplication(a, b) {
    return a * b;
}
function division(a, b) {
    return a / b;
}
function operate(operator, a, b) {
    switch (operator) {
        case '+': return addition(a, b);
        case '-': return subtraction(a, b);
        case '*': return multiplication(a, b);
        case '/': return division(a, b);
    }
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-keys button');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.textContent.trim();

        if (isNumber(input) || input === '.') {
            appendNumber(input);
        } else if (isOperator(input)) {
            handleOperator(input);
        } else if (input === '=') {
            calculate();
        } else if (input.toLowerCase() === 'clear') {
            clearAll();
        }
    });
});

function isNumber(value) {
    return !isNaN(value);
}

function isOperator(op) {
    return ['+', '-', '*', '/'].includes(op);
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    if (num === '.' && display.value.includes('.')) return;
    display.value += num;
}

function handleOperator(operator) {

    if (display.value === '') return;

    if (currentOperator !== null && !shouldResetDisplay) {
        calculate(); 
    }

    firstOperand = parseFloat(display.value);
    currentOperator = operator;

    display.value += operator;

    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;

    const operatorIndex = display.value.lastIndexOf(currentOperator);
    secondOperand = parseFloat(display.value.slice(operatorIndex + 1));

    if (isNaN(firstOperand) || isNaN(secondOperand)) return;

    const result = operate(currentOperator, firstOperand, secondOperand);
    display.value = roundResult(result);
    firstOperand = result;
    currentOperator = null;
    shouldResetDisplay = true;
}

function clearAll() {
    display.value = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
}

function roundResult(number) {
    if (!isFinite(number)) return 'Error';
    return Math.round(number * 1000) / 1000;
}
