class Calculator{
constructor (previousViewTextElement, currentViewTextElement){
    this.previousViewTextElement = previousViewTextElement
    this.currentViewTextElement = currentViewTextElement
    this.clear()
}

clear() {
    this.currentView = ''
    this.previousView = ''
    this.operator = undefined
}

delete() {
    this.currentView = this.currentView.toString().slice(0, -1)
}

appendNumber(number) {
    if (
        number === '.' && this.currentView.includes('.')
    ) return
    this.currentView = this.currentView.toString() + number.toString()
}

chooseOperator(operator) {
    if (this.currentView === '')
    return
    if(this.previousView !== '') {
        this.compute()
    }
    this.operator = operator
    this.previousView = this.currentView
    this.currentView = ''
}

compute() {
        let computation;
        const prev = parseFloat(this.previousView)
        const current = parseFloat(this.currentView)
        if (
            isNaN(prev) || isNaN(current)
        ) return
        switch (this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
        default:
            return
        }
        this.currentView = computation;
        this.previousView = '';
        this.operator = undefined;
    }

getDisplayElement(number) {
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigit.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if(decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay
        }
    }

updateDisplay() {
        this.currentViewTextElement.innerText =
        this.getDisplayElement(this.currentView)
        if (this.operator != null) {
            this.previousViewTextElement.innerText =
            `${this.getDisplayElement(this.previousView)} ${this.operator}`
        } else{
            this.previousViewTextElement.innerText = '';
        }
    }
}

const numberButton = document.querySelectorAll('[data-numbers]');
const operatorButton = document.querySelectorAll('[data-operators]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousViewTextElement = document.querySelector('[data-previous-view]');
const currentViewTextElement = document.querySelector('[data-current-view]');

const calculator = new Calculator(previousViewTextElement, currentViewTextElement);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
});

equalButton.addEventListener(
    'click', button => {
        calculator.compute()
        calculator.updateDisplay()
    }
)

allClearButton.addEventListener(
    'click', button => {
        calculator.clear()
        calculator.updateDisplay()
    }
)

deleteButton.addEventListener(
    'click', button => {
        calculator.delete()
        calculator.updateDisplay()
    }
)