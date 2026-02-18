const theForm = document.querySelector('#creditcardForm');
const errorsEl = document.querySelector('.errors');

const cardNumberInput = document.querySelector('#cardNumber');
const cardHolderInput = document.querySelector('#cardHolder');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const cvcInput = document.querySelector('#cvc');

// ---------- Helpers ----------

function displayError(msg) {
  errorsEl.textContent = msg;
}

function digitsOnly(value) {
  return value.replace(/\D/g, '');
}

function formatCardNumber(value) {
  const digits = digitsOnly(value).slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function isCardNumberValid(number) {
  return number === '1234123412341234';
}

function isCvcValid(cvc) {
  // allow 3 or 4 digits
  return /^\d{3,4}$/.test(cvc);
}

function isMonthValid(mm) {
  if (!/^\d{2}$/.test(mm)) return false;
  const m = Number(mm);
  return m >= 1 && m <= 12;
}

function isYearValid(yy) {
  return /^\d{2}$/.test(yy);
}

function isNotExpired(mm, yy) {
  const month = Number(mm);
  const year = 2000 + Number(yy);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year > currentYear) return true;
  if (year === currentYear && month >= currentMonth) return true;
  return false;
}

// ---------- Input behaviors ----------

// Format card number as groups of 4
cardNumberInput.addEventListener('input', (e) => {
  const old = e.target.value;
  e.target.value = formatCardNumber(old);
});

// Keep MM/YY/CVC numeric and limited
monthInput.addEventListener('input', (e) => {
  e.target.value = digitsOnly(e.target.value).slice(0, 2);
});

yearInput.addEventListener('input', (e) => {
  e.target.value = digitsOnly(e.target.value).slice(0, 2);
});

cvcInput.addEventListener('input', (e) => {
  e.target.value = digitsOnly(e.target.value).slice(0, 4);
});

// ---------- Submit handler and validations ----------

function submitHandler(event) {
  event.preventDefault();
  displayError('');

  let errorMsg = '';

  // Card number: must be 16 digits
  const cardNumDigits = digitsOnly(cardNumberInput.value.trim());
  if (!/^\d{16}$/.test(cardNumDigits)) {
    errorMsg += 'Card number must be 16 digits\n';
  } else if (!isCardNumberValid(cardNumDigits)) {
    errorMsg += 'Card number is not valid\n';
  }

  // Card holder: basic non-empty check
  const holder = cardHolderInput.value.trim();
  if (holder.length < 2) {
    errorMsg += 'Card holder name is required\n';
  }

  // Expiration: MM/YY and not expired
  const mm = monthInput.value.trim();
  const yy = yearInput.value.trim();

  if (!isMonthValid(mm)) {
    errorMsg += 'Expiration month must be 01-12\n';
  }
  if (!isYearValid(yy)) {
    errorMsg += 'Expiration year must be 2 digits\n';
  }
  if (isMonthValid(mm) && isYearValid(yy) && !isNotExpired(mm, yy)) {
    errorMsg += 'Card is expired\n';
  }

  // CVC
  const cvc = cvcInput.value.trim();
  if (!isCvcValid(cvc)) {
    errorMsg += 'CVC/CVV must be 3 or 4 digits\n';
  }

  if (errorMsg !== '') {
    displayError(errorMsg);
    return;
  }

  // Success: replace form with confirmation message
  theForm.innerHTML = '<h2>Payment submitted successfully!</h2>';
}

theForm.addEventListener('submit', submitHandler);
