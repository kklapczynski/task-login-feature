const form = document.getElementsByClassName('login-container')[0]
const emailLabel = document.getElementById('email-label')
const emailInput = document.getElementById('email')
const emailErrorMessage = document.getElementById('email-error-message')
const passwordLabel = document.getElementById('password-label')
const passwordInput = document.getElementById('password')
const passwordErrorMessage = document.getElementById('password-error-message')
const loginButton = document.getElementById('login-button')
const resetPassButton = document.getElementById('reset-pass-button')
const forgottenPassword = document.getElementById('login-footer-text')
const loginFooter = document.getElementsByClassName('login-footer')[0]
const cancelButton = document.getElementById('cancel-reset-button')

const loginModeElements = document.getElementsByClassName('login-mode')
const resetPasswordElements = document.getElementsByClassName('reset-password-mode')

// check validity for error message display on losing focus
form.addEventListener('change', (event) => {
  if (event.target.id === 'email' && !emailInput.validity.valid) {
    showEmailError()
  }
  if (event.target.id === 'password' && !passwordInput.validity.valid) {
    showPasswordError()
  }
})

// remove error message on input when is valid
form.addEventListener('input', (event) => {
  if (event.target.id === 'email' && emailInput.validity.valid) {
    hideEmailError()
  }
  if (event.target.id === 'password' && passwordInput.validity.valid) {
    hidePasswordError()
  }

  // toggle disable attribute of login button on both inputs validity
  if ((event.target.id === 'email' || event.target.id === 'password')) {
    if (loginMode) {
      (emailInput.checkValidity() && passwordInput.checkValidity())
        ? loginButton.removeAttribute('disabled')
        : loginButton.setAttribute('disabled', 'disabled')
    } else if (!loginMode) {
      (emailInput.checkValidity())
        ? resetPassButton.removeAttribute('disabled')
        : resetPassButton.setAttribute('disabled', 'disabled')
    }
  }
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  sendData()
})

forgottenPassword.addEventListener('click', () => {
  switchToResetPassword()
  clearInput(emailInput)
  hideEmailError()
})

cancelButton.addEventListener('click', () => {
  switchToLogin()
  clearInput(emailInput)
  hideEmailError()
  clearInput(passwordInput)
  hidePasswordError()
})

const clearInput = function (inputEl) {
  inputEl.value = ''
}

const showEmailError = function () {
  emailErrorMessage.innerHTML = 'Invalid email address'
  emailInput.classList.add('error-border')
  emailLabel.classList.add('error-color')
}

const hideEmailError = function () {
  emailErrorMessage.innerHTML = ''
  emailInput.classList.remove('error-border')
  emailLabel.classList.remove('error-color')
}

const showPasswordError = function () {
  passwordErrorMessage.innerHTML = 'Invalid password'
  passwordInput.classList.add('error-border')
  passwordLabel.classList.add('error-color')
}

const hidePasswordError = function () {
  passwordErrorMessage.innerHTML = ''
  passwordInput.classList.remove('error-border')
  passwordLabel.classList.remove('error-color')
}

// flag for submit button
let loginMode = true

const switchToResetPassword = function () {
  // switch flag
  loginMode = !loginMode

  // show reset-password-mode
  Array.from(resetPasswordElements).forEach(el => el.classList.remove('hide'))

  // hide login-mode elements
  Array.from(loginModeElements).forEach(el => el.classList.add('hide'))

  // give space-between content of footer to separate cancel and reset password buttons
  loginFooter.classList.add('space-between')
}

const switchToLogin = function () {
  // switch flag
  loginMode = !loginMode

  // show login-mode elements
  Array.from(loginModeElements).forEach(el => el.classList.remove('hide'))

  // hide reset-password-mode elements
  Array.from(resetPasswordElements).forEach(el => el.classList.add('hide'))

  // go back to default: content on the right
  loginFooter.classList.remove('space-between')
}

const sendData = function () {
  // here normally goes AJAX call using XMLHttpRequest to server
  // in login case for its authentication

  // just to show that something happens after submitting the form
  let alertText

  loginMode
    ? alertText = 'Pretending your login data was sent for authentication.'
    : alertText = 'Pretending reset password request was send to server.'

  alert(alertText)
}
