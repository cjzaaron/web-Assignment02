//hide table3&4
// document.getElementById("table3").style.display = "none";
// document.getElementById("table4").style.display = "none";


const emailInput = document.querySelector("#table1 input[type='email']");
emailInput.addEventListener('blur', validateEmail);


const firstNameInput = document.querySelector("#table1 input[name='firstName']");
const lastNameInput = document.querySelector("#table1 input[name='lastName']");
firstNameInput.addEventListener('blur', validateName);
lastNameInput.addEventListener('blur', validateName);


const phoneNumberInput = document.querySelector("#table1 input[type='tel']");
phoneNumberInput.addEventListener('blur', validatePhoneNumber);


const calculateBtn = document.getElementById('calculateBtn');

calculateBtn.addEventListener('click', check1);

calculateBtn.addEventListener('click', calculateTotalCost);

function calculateTotalCost() {
    // 获取用户输入
    const standardRoomQty = parseInt(document.getElementById('Standard').value);
    const doubleRoomQty = parseInt(document.getElementById('Double').value);
    const deluxeRoomQty = parseInt(document.getElementById('Deluxe').value);
    const startDate = new Date(document.getElementById('Start').value);
    const endDate = new Date(document.getElementById('End').value);
    const breakfastAdultsQty = parseInt(document.getElementById('adults').value);
    const breakfastChildrenQty = parseInt(document.getElementById('children').value);
    const breakfastyes = document.getElementById('breakfast').checked;


    // 计算总成本
    const totalNights = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const standardRoomCost = 200 * standardRoomQty;
    const doubleRoomCost = 300 * doubleRoomQty;
    const deluxeRoomCost = 400 * deluxeRoomQty;
    var breakfastAdultsCost;
    var breakfastChildrenCost;
    var breakfastCost;
    const roomCost = (standardRoomCost + doubleRoomCost + deluxeRoomCost) * totalNights;
    if (breakfastyes == true) {
        breakfastAdultsCost = 50 * breakfastAdultsQty * totalNights;
        breakfastChildrenCost = 20 * breakfastChildrenQty * totalNights;
        breakfastCost = breakfastAdultsCost + breakfastChildrenCost;
    } else {
        breakfastCost = 0;
    }

    const totalCost = roomCost + breakfastCost;

    // 显示总成本
    const totalCostSpan = document.getElementById('total-cost');
    totalCostSpan.textContent = `$${totalCost}`;
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
  
  
  
  
  
  

function check1() {
    // 检查所有输入是否都已填写
    const inputs = document.querySelectorAll("#table1 input, #table2 input");
    const allInputsFilled = Array.from(inputs).every((input) => input.value);
    // 获取用户输入tel
    
    const phoneNumberValue = phoneNumberInput.value.trim();
    // 检查电话号码格式是否正确
    const phoneNumberRegex = /^\d{3}-\d{2}-\d{3}$/;
    // 获取用户输入email
    
    const emailValue = emailInput.value.trim();
    // 检查电子邮件地址格式是否正确
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 如果所有输入都已填写，则显示 table3 和 table4
    if (!allInputsFilled) {
        alert("Please fill in all fields in table 1 and table 2.");
        document.getElementById("table3").style.display = "none";
        document.getElementById("table4").style.display = "none";
        return;
    } else if (!phoneNumberRegex.test(phoneNumberValue)) {
        alert("Please enter a valid phone number in the format xxx-xx-xxx.");
        document.getElementById("table3").style.display = "none";
        document.getElementById("table4").style.display = "none";
        return;
    } else if (!emailRegex.test(emailValue)) {
        alert("Please enter a valid email address.");
        document.getElementById("table3").style.display = "none";
        document.getElementById("table4").style.display = "none";
        return;
    } else {
        document.getElementById("table3").style.display = "table";
        document.getElementById("table4").style.display = "table";
    }
}


// 获取相关元素
const cardTypeRadios = document.querySelectorAll("input[type='radio'][name='card']");
const tipsComment = document.querySelector("#tips");

// 在 cardTypeRadios 上添加点击事件监听器
cardTypeRadios.forEach(function (radio) {
    radio.addEventListener("click", function () {
        if (this.value === "union") {
            tipsComment.innerText = "UnionPay cards have 16 to 19 digits and start with 6.";
        } else if (this.value === "visa") {
            tipsComment.innerText = "Visa cards have 16 digits and start with 4.";
        } else if (this.value === "mastercard") {
            tipsComment.innerText = "MasterCard cards have 16 digits and start with 5.";
        }
    });
});




const cancelBtn = document.querySelector("#cancel");

// 在 cancelBtn 上添加点击事件监听器
cancelBtn.addEventListener("click", function () {
    location.reload();
});


// 获取相关元素
const payBtn = document.querySelector("#pay");

const cardNumberInput = document.querySelector("#table3 input[type='text']");

const expiryMonthInput = document.querySelector("#table3 input[type='month']");

const cvvInput = document.querySelector("#table3 input[type='password']");



// 在 payBtn 上添加点击事件监听器
payBtn.addEventListener("click", function () {
    let selectedCardType = null;
    for (let i = 0; i < cardTypeRadios.length; i++) {
        if (cardTypeRadios[i].checked) {
            selectedCardType = cardTypeRadios[i].value;
            break;
        }
    }
    // 检查表单是否填写完整
    if (selectedCardType === null || !cardNumberInput.value || !expiryMonthInput.value || !cvvInput.value) {
        alert("Please fill in all fields in Card information");
        return;
    } else {
        // 验证表单内容
        const cardType = document.querySelector("input[type='radio'][name='card']:checked").value;
        const cardNumber = cardNumberInput.value.trim();
        const cvv = cvvInput.value.trim();
        if (cardType === "union") {
            if (!/^6\d{15,18}$/.test(cardNumber)) {
                alert("The card number is invalid for a UnionPay card.");
                return;
            }
        } else if (cardType === "visa") {
            if (!/^4\d{15}$/.test(cardNumber)) {
                alert("The card number is invalid for a Visa card.");
                return;
            }
        } else if (cardType === "mastercard") {
            if (!/^5\d{15}$/.test(cardNumber)) {
                alert("The card number is invalid for a MasterCard card.");
                return;
            }
        } else {
            alert("Please select a valid card type.");
            return;
        }

        // 验证 CVV 是否为三位数
        if (!/^\d{3}$/.test(cvv)) {
            alert("The CVV must be a three-digit number.");
            return;
        }
        alert("Success!");
    }
});

function validateCardNumber() {
    const cardNumber = document.querySelector('#card-number').value;
    const cardNumberError = document.querySelector('#card-number-error');
  
    if (cardNumber === '') {
      cardNumberError.textContent = 'Card number is required.';
      return false;
    }
  
    const unionPayPattern = /^62[0-9]{14,17}$/;
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^5[1-5][0-9]{14}$/;
  
    if (unionPayPattern.test(cardNumber)) {
      cardNumberError.textContent = '';
      return true;
    } else if (visaPattern.test(cardNumber)) {
      cardNumberError.textContent = '';
      return true;
    } else if (mastercardPattern.test(cardNumber)) {
      cardNumberError.textContent = '';
      return true;
    } else {
      cardNumberError.textContent = 'Invalid card number.';
      return false;
    }
  }
  cardNumberInput.addEventListener('blur', validateCardNumber);

  function validateCVV() {
    const cvv = document.querySelector('#cvv').value;
    const cvvError = document.querySelector('#cvv-error');
  
    if (cvv === '') {
      cvvError.textContent = 'CVV is required.';
      return false;
    }
  
    const unionPayCVV = /^[0-9]{3}$/;
    const visaMastercardCVV = /^[0-9]{3}$/;
  
    if (unionPayCVV.test(cvv) || visaMastercardCVV.test(cvv)) {
      cvvError.textContent = '';
      return true;
    } else {
      cvvError.textContent = 'Invalid CVV.';
      return false;
    }
  }
  

  function validateCardholderName() {
    const cardholderName = document.querySelector('#cardholder-name').value;
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
  const cvvInput1 = document.querySelector('#cvv');
  const cardholderNameInput = document.querySelector('#cardholder-name');
  cvvInput1.addEventListener('blur', validateCVV);
  cardholderNameInput.addEventListener('blur', validateCardholderName);
  
