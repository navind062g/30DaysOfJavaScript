const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const password2 = document.getElementById('password2');

//Functions
function showError(controlField, message) {
    const formControl = controlField.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isValidEmail(str) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
}

function checkRequired(inputArray) {
    inputArray.forEach(element => {
        let inputField = getFieldName(element);
        if(element.value === '' || !element.value) {
            showError(element, `${inputField} is required!`);
        } else if(inputField === 'Email' && !isValidEmail(email.value)) {
            showError(email, 'Email Id is not Valid');
        } 
        else {
            showSuccess(element);
        }
    });
}

function checkLength(inputElm, minLength, maxLength) {
    let inputValue = inputElm.value;
    let inputField = getFieldName(inputElm);
    let inputLength = inputValue.length;
    if(inputValue === '' || inputValue === undefined)
    {
        showError(inputElm, `${inputField} is Unknown`);
    }
    else if(inputLength < minLength) {
        showError(inputElm, `${inputField} cannot be less than ${minLength} characters`);
    }
    else if(inputLength > maxLength) {
        showError(inputElm, `${inputField} cannot be greater than ${maxLength} characters`);
    }
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, `Passwords Do Not Match`);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, email, password, password2]);

    checkLength(username, 5, 15);

    checkLength(password, 6, 20);

    checkPasswordsMatch(password, password2);
});