const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formSuccess = document.getElementById('formSuccess');

function setValid(el) {
  el.classList.remove('input-invalid');
  el.classList.add('input-valid');
}
function setInvalid(el) {
  el.classList.remove('input-valid');
  el.classList.add('input-invalid');
}
function clearState(el) {
  el.classList.remove('input-valid', 'input-invalid');
}

// Basic validators
function validateName() {
  const value = nameInput.value.trim();
  if (!value) {
    nameError.textContent = 'Name is required.';
    setInvalid(nameInput);
    return false;
  }
  nameError.textContent = '';
  setValid(nameInput);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    emailError.textContent = 'Email is required.';
    setInvalid(emailInput);
    return false;
  }
  // simple check: contains '@' and has at least one character before and after
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    emailError.textContent = 'Please enter a valid email (include @).';
    setInvalid(emailInput);
    return false;
  }
  emailError.textContent = '';
  setValid(emailInput);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) {
    passwordError.textContent = 'Password is required.';
    setInvalid(passwordInput);
    return false;
  }
  if (value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters.';
    setInvalid(passwordInput);
    return false;
  }
  passwordError.textContent = '';
  setValid(passwordInput);
  return true;
}

// Live validation on input
nameInput.addEventListener('input', () => {
  formSuccess.textContent = '';
  if (!nameInput.value) { clearState(nameInput); nameError.textContent = ''; return; }
  validateName();
});
emailInput.addEventListener('input', () => {
  formSuccess.textContent = '';
  if (!emailInput.value) { clearState(emailInput); emailError.textContent = ''; return; }
  validateEmail();
});
passwordInput.addEventListener('input', () => {
  formSuccess.textContent = '';
  if (!passwordInput.value) { clearState(passwordInput); passwordError.textContent = ''; return; }
  validatePassword();
});

// On submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.textContent = '';

  const v1 = validateName();
  const v2 = validateEmail();
  const v3 = validatePassword();

  if (v1 && v2 && v3) {
    // success — show message and optionally reset (keeps visual valid state)
    formSuccess.textContent = 'Registration successful!';
    // Optionally reset after short delay:
    // setTimeout(() => { form.reset(); clearState(nameInput); clearState(emailInput); clearState(passwordInput); formSuccess.textContent = ''; }, 1200);
  } else {
    // focus first invalid field
    if (!v1) nameInput.focus();
    else if (!v2) emailInput.focus();
    else if (!v3) passwordInput.focus();
  }
});
