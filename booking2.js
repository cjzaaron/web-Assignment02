// Element selectors
const emailInput = document.querySelector("#table1 input[type='email']");
const firstNameInput = document.querySelector("#table1 input[name='firstName']");
const lastNameInput = document.querySelector("#table1 input[name='lastName']");
const phoneNumberInput = document.querySelector("#table1 input[type='tel']");
const calculateBtn = document.getElementById('calculateBtn');
const cancelBtn = document.querySelector("#cancel");
const payBtn = document.querySelector("#pay");
const cardTypeRadios = document.querySelectorAll("input[type='radio'][name='card']");
const tipsComment = document.querySelector("#tips");
const cardNumberInput = document.querySelector("#table3 input[type='text']");
const expiryMonthInput = document.querySelector("#table3 input[type='month']");
const cvvInput = document.querySelector("#table3 input[type='password']");
const cardholderNameInput = document.querySelector('#cardholder-name');

// Event listeners
emailInput.addEventListener('blur', validateEmail);
firstNameInput.addEventListener('blur', validateName);
lastNameInput.addEventListener('blur', validateName);
phoneNumberInput.addEventListener('blur', validatePhoneNumber);
calculateBtn.addEventListener('click', check1);
calculateBtn.addEventListener('click', calculateTotalCost);
cancelBtn.addEventListener("click", () => location.reload());
payBtn.addEventListener("click", payBtnHandler);


cardNumberInput.addEventListener('blur', validateCardNumber);
cvvInput.addEventListener('blur', validateCVV);
cardholderNameInput.addEventListener('blur', validateCardholderName);

// Functions
function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('email-error');

    if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
}

function validateName() {
    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();
    const nameError = document.getElementById('name-error');
    if (firstNameValue === '' || lastNameValue === '') {
        nameError.textContent = 'Please enter your first and last name.';
    } else {
        nameError.textContent = '';
    }
}

function validatePhoneNumber() {
    const phoneNumberValue = phoneNumberInput.value.trim();
    const phoneNumberRegex = /^\d{3}-\d{2}-\d{3}$/;
    const phoneNumberError = document.getElementById('phone-number-error');

    if (!phoneNumberRegex.test(phoneNumberValue)) {
        phoneNumberError.textContent = 'Please enter a valid phone number in the format xxx-xx-xxx.';
    } else {
        phoneNumberError.textContent = '';
    }
}

function check1() {
    const inputs = document.querySelectorAll("#table1 input, #table2 input");
    const allInputsFilled = Array.from(inputs).every((input) => input.value);

    if (!allInputsFilled) {
        alert("Please fill in all fields in table 1 and table 2.");
        document.getElementById("table3").style.display = "none";
        document.getElementById("table4").style.display = "none";
        return;
    } else {
        document.getElementById("table3").style.display = "table";
        document.getElementById("table4").style.display = "table";
    }
}
function calculateTotalCost() {
    const standardRoomQty = parseInt(document.getElementById('Standard').value);
    const doubleRoomQty = parseInt(document.getElementById('Double').value);
    const deluxeRoomQty = parseInt(document.getElementById('Deluxe').value);
    const startDate = new Date(document.getElementById('Start').value);
    const endDate = new Date(document.getElementById('End').value);
    const breakfastAdultsQty = parseInt(document.getElementById('adults').value);
    const breakfastChildrenQty = parseInt(document.getElementById('children').value);
    const breakfastYes = document.getElementById('breakfast').checked;
    const totalNights = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const standardRoomCost = 200 * standardRoomQty;
    const doubleRoomCost = 300 * doubleRoomQty;
    const deluxeRoomCost = 400 * deluxeRoomQty;

    let breakfastCost;
    if (breakfastYes) {
        const breakfastAdultsCost = 50 * breakfastAdultsQty * totalNights;
        const breakfastChildrenCost = 20 * breakfastChildrenQty * totalNights;
        breakfastCost = breakfastAdultsCost + breakfastChildrenCost;
    } else {
        breakfastCost = 0;
    }

    const roomCost = (standardRoomCost + doubleRoomCost + deluxeRoomCost) * totalNights;
    const totalCost = roomCost + breakfastCost;

    const totalCostSpan = document.getElementById('total-cost');
    totalCostSpan.textContent = `$${totalCost}`;
}

function payBtnHandler() {
    const selectedCardType = getSelectedCardType();
    if (!isFormComplete(selectedCardType)) {
        alert("Please fill in all fields in Card information");
        return;
    }
    if (!validateCardInfo(selectedCardType)) {
        return;
    }

    alert("Success!");
}
function getSelectedCardType() {
    let selectedCardType = null;
    for (let i = 0; i < cardTypeRadios.length; i++) {
        if (cardTypeRadios[i].checked) {
            selectedCardType = cardTypeRadios[i].value;
            break;
        }
    }
    return selectedCardType;
}

function isFormComplete(selectedCardType) {
    return selectedCardType !== null && cardNumberInput.value && expiryMonthInput.value && cvvInput.value;
}

function validateCardInfo(cardType) {
    const cardNumber = cardNumberInput.value.trim();
    const cvv = cvvInput.value.trim();
    const cardValidation = {
        union: { pattern: /^6\d{15,18}$/, errorMsg: 'The card number is invalid for a UnionPay card.' },
        visa: { pattern: /^4\d{15}$/, errorMsg: 'The card number is invalid for a Visa card.' },
        mastercard: { pattern: /^5\d{15}$/, errorMsg: 'The card number is invalid for a MasterCard card.' }
    };

    if (!cardValidation[cardType].pattern.test(cardNumber)) {
        alert(cardValidation[cardType].errorMsg);
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert("The CVV must be a three-digit number.");
        return false;
    }

    return true;
}
function validateCardNumber() {
    const cardNumber = cardNumberInput.value;
    const cardNumberError = document.querySelector('#card-number-error');
    if (cardNumber === '') {
        cardNumberError.textContent = 'Card number is required.';
        return false;
    }

    const unionPayPattern = /^6[0-9]{14,17}$/;
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^5[1-5][0-9]{14}$/;

    if (unionPayPattern.test(cardNumber) || visaPattern.test(cardNumber) || mastercardPattern.test(cardNumber)) {
        cardNumberError.textContent = '';
        return true;
    } else {
        cardNumberError.textContent = 'Invalid card number.';
        return false;
    }
}

function validateCVV() {
    const cvv = cvvInput.value;
    const cvvError = document.querySelector('#cvv-error');

    if (cvv === '') {
        cvvError.textContent = 'CVV is required.';
        return false;
    }

    const cvvPattern = /^[0-9]{3}$/;

    if (cvvPattern.test(cvv)) {
        cvvError.textContent = '';
        return true;
    } else {
        cvvError.textContent = 'Invalid CVV.';
        return false;
    }
}

function validateCardholderName() {
    const cardholderName = cardholderNameInput.value;
    const cardholderNameError = document.querySelector('#cardholder-name-error');

    if (cardholderName === '') {
        cardholderNameError.textContent = 'Cardholder name is required.';
        return false;
    }

    const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if (namePattern.test(cardholderName)) {
        cardholderNameError.textContent = '';
        return true;
    } else {
        cardholderNameError.textContent = 'Invalid cardholder name.';
        return false;
    }
}

function showCardTips() {
    if (this.value === "union") {
        tipsComment.innerText = "UnionPay cards have 16 to 19 digits and start with 6.";
    } else if (this.value === "visa") {
        tipsComment.innerText = "Visa cards have 16 digits and start with 4.";
    } else if (this.value === "mastercard") {
        tipsComment.innerText = "MasterCard cards have 16 digits and start with 5.";
    }
}

function addEventListeners() {
    emailInput.addEventListener('blur', validateEmail);
    firstNameInput.addEventListener('blur', validateName);
    lastNameInput.addEventListener('blur', validateName);
    phoneNumberInput.addEventListener('blur', validatePhoneNumber);
    calculateBtn.addEventListener('click', check1);
    calculateBtn.addEventListener('click', calculateTotalCost);
    cardTypeRadios.forEach(radio => radio.addEventListener("click", showCardTips));
    cancelBtn.addEventListener('click', () => location.reload());
    payBtn.addEventListener('click', payBtnHandler);
    cardNumberInput.addEventListener('blur', validateCardNumber);
    cvvInput.addEventListener('blur', validateCVV);
    cardholderNameInput.addEventListener('blur', validateCardholderName);
}

function hideTables() {
    document.getElementById("table3").style.display = "none";
    document.getElementById("table4").style.display = "none";
}

function init() {
    hideTables();
    addEventListeners();
}

init(); 
