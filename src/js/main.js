const form = document.getElementsByClassName('login-container')[0];
const headerText = document.getElementById('header-text');
const resetPassInfo = document.getElementById('reset-pass-info');
const emailLabel = document.getElementById('email-label');
const emailInput = document.getElementById('email');
const emailErrorMessage = document.getElementById('email-error-message');
const passwordContainer = document.getElementById('password-container');
const passwordLabel = document.getElementById('password-label');
const passwordInput = document.getElementById('password');
const passwordErrorMessage = document.getElementById('password-error-message');
const rememberMeContainer = document.getElementById('remember-me-container');
const loginButton = document.getElementById('login-button');
const resetPassButton = document.getElementById('reset-pass-button');
const forgottenPassword = document.getElementById('login-footer-text');
const loginFooter = document.getElementsByClassName('login-footer')[0];
const cancelButton = document.getElementById('cancel-reset-button');
const loginModeOnlyElements = document.getElementsByClassName('login-mode-only')[0];




// DONE: check validity for error message display on losing focus
form.addEventListener('change', (event) => {
    if(event.target.id === 'email' && !emailInput.validity.valid) {
        showEmailError();
    }
    if(event.target.id === 'password' && !passwordInput.validity.valid) {
        showPasswordError();
    }
    return;
});

// DONE: remove error message on input when is valid
form.addEventListener('input', (event) => {
    if(event.target.id === 'email' && emailInput.validity.valid) {
        hideEmailError();
    }
    if(event.target.id === 'password' && passwordInput.validity.valid) {
        hidePasswordError();
    }

    // toggle disable attribute of login button on both inputs validity
    if((event.target.id === 'email' || event.target.id === 'password')) {
        if(loginMode) {
            (emailInput.checkValidity() && passwordInput.checkValidity())
            ? loginButton.removeAttribute('disabled')
            : loginButton.setAttribute('disabled', 'disabled');
        } else if(!loginMode) {
            (emailInput.checkValidity())
            ? resetPassButton.removeAttribute('disabled')
            : resetPassButton.setAttribute('disabled', 'disabled');
        }
    }
    return;
});

form.addEventListener("submit", function (event) {
    // redundand as submit button is disabled when inputs not valid
    // if(!email.validity.valid) {
    //     emailErrorMessage.innerHTML = 'Invalid email address';
    //     emailErrorMessage.className = 'error error-message';
    //     emailLabel.className = 'error';
    // }
    event.preventDefault();
    sendData();
});

forgottenPassword.addEventListener('click', () => {
    switchToResetPassword();
    clearInput(emailInput);
    hideEmailError();
    return;
});

cancelButton.addEventListener('click', () => {
    switchToLogin();
    clearInput(emailInput);
    hideEmailError();
    clearInput(passwordInput);
    hidePasswordError();
    return;
})

const clearInput = function(inputEl) {
    inputEl.value = '';
    return;
}

const showEmailError = function() {
    emailErrorMessage.innerHTML = 'Invalid email address';
    email.classList.add('error-border');
    emailLabel.classList.add('error-color');
    return;
}

const hideEmailError = function() {
    emailErrorMessage.innerHTML = '';
    email.classList.remove('error-border');
    emailLabel.classList.remove('error-color');
    return;
}

const showPasswordError = function() {
    passwordErrorMessage.innerHTML = 'Invalid password';
    password.classList.add('error-border');
    passwordLabel.classList.add('error-color');
    return;
}

const hidePasswordError = function() {
    passwordErrorMessage.innerHTML = '';
    password.classList.remove('error-border');
    passwordLabel.classList.remove('error-color');
    return;
}

let loginMode = true;
// array of el. to hide
// array of el. to show
const switchToResetPassword = function() {
    loginMode = !loginMode;
    // hideEl([elToHide])
    // showEl([elToShow])
    headerText.classList.remove('hide');
    resetPassInfo.classList.remove('hide');
    // loginModeOnlyElements.classList.add('hide');
    passwordContainer.classList.add('hide');
    rememberMeContainer.classList.add('hide');
    loginButton.classList.add('hide');
    resetPassButton.classList.remove('hide');
    cancelButton.classList.remove('hide');
    loginFooter.classList.add('space-between');
    forgottenPassword.classList.add('hide');
    return;
};

const switchToLogin = function() {
    loginMode = !loginMode;
    // hideEl([elToHide])
    headerText.classList.add('hide');
    resetPassInfo.classList.add('hide');
    passwordContainer.classList.remove('hide');
    rememberMeContainer.classList.remove('hide');
    loginButton.classList.remove('hide');
    resetPassButton.classList.add('hide');
    cancelButton.classList.add('hide');
    loginFooter.classList.remove('space-between');
    forgottenPassword.classList.remove('hide');
    return;
};

const sendData = function() {
    // AJAX call using XMLHttpRequest
    let alertText;
    loginMode
        ? alertText='Pretending your login data was sent for authentication.'
        : alertText='Pretending reset password request was send to server.';
    alert(alertText);
    return;
}


