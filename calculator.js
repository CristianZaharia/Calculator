let display = document.querySelector('.display');
let ans = document.querySelector('.answer');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const btnClear = document.querySelector('.btn-clear');

const calculator = {
    numA: null,
    numB: null,
    operator: null,
    lastButton: null,
    result: 0,
    calculated: null,
};

function add(a, b){
    calculator.result = ((Number(a) + Number(b)).toFixed(3) / 1).toString();
}

function substract(a, b){
    calculator.result = ((Number(a) - Number(b)).toFixed(3) / 1).toString();
}

function multiply(a, b){
    calculator.result = ((Number(a) * Number(b)).toFixed(3) / 1).toString();
}

function divide(a, b){
    calculator.result = ((Number(a) / Number(b)).toFixed(3) / 1).toString();
}

function percent(a, b){
    calculator.result = ((Number(a) / 100) * b).toString();
}

// checks if an operator value exists in operator key
function checkOperator(){
    let op = calculator.operator;
    if (op === '%' || op === '÷' || op === '×' || op === '-' || op === '+'){
        return calculator.operator;
    }
    else {
        return false;
    }
}

function isCalculated(){
    if (calculator.calculated === true){
        calculator.numA = null;
        display.textContent = "";
        calculator.calculated = null;
    }
}

function changeObject(object, key, value){
    // if property has value null, delete null and set new number string
    // else add new number string to old number string
    if (object[key] === null){
        delete object[key];
        object[key] = value;
    }
    else {
        object[key] =  object[key] + value;
    }
}

// show one of the 3 Ans branches
function showAns(show){
    if (display.innerText === '0'){
        ans.textContent = 'Ans = 0';
    } 
    else if (show === 'first'){
        ans.textContent = `${calculator.numA} ${calculator.operator} ${calculator.numB} =`;
    }
    else if (show === 'second'){
        ans.textContent = `Ans = ${calculator.result}`;
    }
}

// execute different statements after clicking on number button
function displayCalc(){
    // if display has no operator add number to numA
    // else to numB
    if (!checkOperator()){
        isCalculated();
        showAns('second');
        // if display shows 0 and user clicks 0, show 0
        if (display.innerText === '0'){
            display.textContent = this.innerText;
        } 
        // if display number has a dot and user presses dot
        else if (display.innerText.includes('.') && this.innerText === '.'){
            // do nothing
        }
        else { 
            display.textContent = display.innerText + this.innerText;
        }
        changeObject(calculator, 'numA', this.innerText);
    }
    else {
        // if display number has a dot and user presses dot
        if (calculator.numB != null || calculator.numB === ''){
            if (calculator.numB.includes('.') && this.innerText === '.'){
                // do nothing
            }
            display.textContent = display.innerText + this.innerText;
        }
        else { 
            display.textContent = display.innerText + ' ' + this.innerText;
        }
        changeObject(calculator, 'numB', this.innerText);
    }
}

// execute different statements after clicking on operator or equal button
function displayOperator(){
    calculator.lastButton = this.innerText;
    // if display has operator, and space after operator
    // or equal button was clicked
    if (display.innerText.includes(calculator.operator + ' ')){
        calculate();
        
        // if calculated is true and last button was an operator
        // display shows result + operator
        if (calculator.calculated && calculator.lastButton !== '=') {
            showAns('second');
            calculator.calculated = null;
            calculator.numB = null;
            calculator.numA = calculator.result;
            calculator.operator = this.innerText;
            display.textContent = calculator.numA + ' ' + calculator.operator;
        }
        else {
            showAns('first');
            calculator.numA = calculator.result;
            calculator.operator = null;
            calculator.numB = null;
        }
    }
    // if numA exists and there is no operator
    else if(this.innerText !== '=' && !checkOperator() && calculator.numA){
        calculator.operator = this.innerText;
        showAns('second');
        calculator.calculated = null;
        display.textContent = display.innerText + ' ' + this.innerText;
    }
    // if numA starts with -
    else if (this.innerText === '-' && !checkOperator()){
        calculator.numA = this.innerText;
        display.textContent = this.innerText;
    }
    // if numA is 0
    else if (!calculator.numA){
        calculator.operator = this.innerText;
        calculator.numA = '0';
        showAns('second');
        display.textContent = display.innerText + ' ' + this.innerText;
    }
}

// calculate and set calculated to true
function calculate(){
    console.table(calculator);
    if (calculator.operator === '%'){
        percent(calculator.numA, calculator.numB);
        display.textContent = calculator.result;
    }
    else if (calculator.operator === '÷'){
        divide(calculator.numA, calculator.numB);
        display.textContent = calculator.result;
    }
    else if (calculator.operator === '×'){
        multiply(calculator.numA, calculator.numB);
        display.textContent = calculator.result;
    }
    else if (calculator.operator === '-'){
        substract(calculator.numA, calculator.numB);
        display.textContent = calculator.result;
    }
    else {
        add(calculator.numA, calculator.numB);
        display.textContent = calculator.result;
    }
    calculator.calculated = true;
    console.table(calculator);
}

// remove last character in the display string and
// clear some or all properties
btnClear.addEventListener('click', function(){
    if (display.innerText === '0'){
        // do nothing
    }
    // slice last character and trimp white space
    else if (display.textContent.includes(`${checkOperator()} `)){
        display.textContent = display.innerText.slice(0, -1).trim();
        calculator.numB = calculator.numB.slice(0, -1);
    }
    else if (checkOperator()){
        display.textContent = display.innerText.slice(0, -1).trim();
        calculator.operator = calculator.operator.slice(0, -1);
    }
    else {
        if (display.innerText.length === 1){
            display.textContent = '0';
            calculator.numA = null;
            calculator.numB = null;
            calculator.operator = null;
            calculator.lastButton = null;
            calculator.result = null;
            calculator.calculated = null;
        }
        else {
            display.textContent = display.innerText.slice(0, -1).trim();
            calculator.numA = calculator.numA.slice(0, -1);
        }
    }
});

numbers.forEach(number => number.addEventListener('click', displayCalc));
operators.forEach(operator => operator.addEventListener('click', displayOperator));