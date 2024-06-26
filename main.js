import { el, setChildren } from 'redom'
import Cleave from 'cleave.js';


const container = el('.container')
const form = el("form.form");
const label = el("label.labelCard", "Введите данные карты")
export const input = el("input.cartNumber", { placeholder: '0000-0000-0000-0000', required: "required" })
const errorCard = el('.error', { style: { color: 'red' } })

const block = el('.block')
const inputDate = el('input.cardDate', { placeholder: '00/00', required: "required" })
const errorDate = el('.error', { style: { color: 'red' } })
const inputCVV = el('input.cardCVV', { placeholder: 'CVV', required: "required" })
const errorCVV = el('.error', { style: { color: 'red' } })

const labelMail = el("label.labelMail", "Ваш email:")
const inputMail = el('input.inputMail', { type: 'email', required: "required" })
const error = el('.error', { style: { color: 'red' } })
const button = el("button.btn", "Отправить", { type: 'submit', disabled: 'true' })


setChildren(document.body, container);
setChildren(container, form)
setChildren(block, [inputDate, inputCVV])
setChildren(form, [label, input, errorCard, block, errorDate, errorCVV, labelMail, inputMail, error, button])


inputMail.onblur = function() {

    if (!inputMail.value.includes('@')) {
        inputMail.classList.add('invalid');
        error.innerHTML = 'Пожалуйста, введите правильный email.'
        inputMail.focus()
    } else {
        inputMail.classList.remove('invalid');
        error.innerHTML = ''
    }
};

input.onblur = function() {

    if (input.value.length <= 15) {
        input.classList.add('invalid');
        errorCard.innerHTML = 'Пожалуйста, введите корректный номер'
        input.focus()
        return false
    } else {
        input.classList.remove('invalid');
        errorCard.innerHTML = ''
        return true
    }
};

inputDate.onblur = function() {

    if (inputDate.value.length < 4) {
        inputDate.classList.add('invalid');
        errorDate.innerHTML = 'Пожалуйста, введите корректную дату'
        inputDate.focus()
    } else {
        inputDate.classList.remove('invalid');
        errorDate.innerHTML = ''
    }
};

inputCVV.onblur = function() {

    if (inputCVV.value.length < 3) {
        inputCVV.classList.add('invalid');
        errorCVV.innerHTML = 'Пожалуйста, введите корректный CVV'
        inputCVV.focus()
    } else {
        inputCVV.classList.remove('invalid');
        errorCVV.innerHTML = ''
    }
};


const inputs = document.querySelectorAll('input')

const checkForm = () => {

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].value === '') {
            button.disabled = true
            return
        } 
    }  
    button.disabled = false
}

for (const inputVal of inputs) {
    inputVal.onkeydown = inputVal.onkeyup = inputVal.change = checkForm;
}



new Cleave(input, {
    creditCard: true,
    creditCardStrictMode: true
})

new Cleave(inputDate, {
    date: true,
    datePattern: ['m', 'y']
})

new Cleave(inputCVV, {
    blocks: [3]
})
