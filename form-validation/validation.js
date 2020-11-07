// Inputs
const signUp = document.querySelector("button");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zipCode = document.querySelector("#zip-code");
const pwd = document.querySelector("#pwd");
const pwdConfirm = document.querySelector("#pwd-confirm");

// Error-Containers
const mailError = document.querySelector("#mail-error");
const countryError = document.querySelector("#country-error");
const zipError = document.querySelector("#zip-error");
const pwdError = document.querySelector("#pwd-error");
const confirmError = document.querySelector("#pwd-confirm-error");
const submitMessage = document.querySelector("#submit-message");

// Error Messages
const REQUIRED_EMPTY = "This field is required.";
const EMAIL_INVALID = "Please enter a valid e-mail address.";
const COUNTRY_INVALID =
  "Please enter a valid country (letters only) or leave this field blank.";
const TOO_SHORT = "Too short.";
const TOO_LONG = "Too long.";
const ZIP_INVALID = "Please enter a valid zip code or leave this field blank.";
const PWD_INVALID = "Please enter a valid password.";
const PWD_MATCH = "Your password and your confirmation don't match.";

// Regular Expressions

// email:
// First character must not be a special character: ^[A-Za-z0-9]
// Following characters are letters, digits or special characters: [\w.!#$%&'*+-/=?^`{|}~] (note: sepcials in [] don't need escaping!)
// Maximum length of the first part of the address: 64: {0,62} (-2 for first and last letter)
// Last char must not be a special char: [A-Za-z0-9]
// This is followed by an "at": @
// Then comes the domain: max 253 characters, including . and -: [\w\.\-]{1,253}
// Then a dot (escaped)
// And finally the top level domain: 2-6 characters: [A-Zaz]{2,6}
// Of course this validation is oversimplified and does not cover all eventualities. It turns out
// that email-validation is quite a beast. But for the purpose of practicing this must suffice.
const MAILEXPR = /^[A-Za-z0-9][\w.!#$%&'*+/=?^`{|}~-]{0,62}[A-Za-z0-9]@[\w.-]{1,253}\.[A-Za-z]{2,6}$/;
// country: only letters allowed, but can be empty
const COUNTRYEXPR = /^[A-Za-z]*$/;
// zip: only letters, numbers, spaces and dashes
const ZIPEXPR = /^[A-Za-z0-9\s-]{3,10}$/;
// pwd: at least 1 uppercase letter, 1 lowercase letter and 1 number
const PWDEXPR_LETTER_UPPER = /[A-Z]/;
const PWDEXPR_LETTER_LOWER = /[a-z]/;
const PWDEXPR_NUM = /[0-9]/;

function checkRequired(field) {
  if (field === "") {
    return false;
  }
  return true;
}

function checkRegEx(regEx, str) {
  return regEx.test(str);
}

function checkMinLength(str, minLength) {
  if (str.length < minLength) {
    return false;
  }
  return true;
}

function checkMaxLength(str, maxLength) {
  if (str.length > maxLength) {
    return false;
  }
  return true;
}

function comparePWD(str) {
  const pwdString = pwd.value;
  if (pwdString === str) {
    return true;
  }
  return false;
}

function handleError(event, span, errorMessage) {
  event.classList.remove("valid");
  event.classList.add("invalid");
  span.textContent = errorMessage;
  // This does not work in Firefox. It is a known bug.
  event.focus();
}

function setValid(event, span) {
  event.classList.remove("invalid");
  event.classList.add("valid");
  span.textContent = "";
}

// Check functions for individual fields
function checkMail(target) {
  if (!checkRequired(target.value)) {
    handleError(target, mailError, REQUIRED_EMPTY);
  } else if (!checkRegEx(MAILEXPR, target.value)) {
    handleError(target, mailError, EMAIL_INVALID);
  } else {
    setValid(target, mailError);
    return true;
  }
  return false;
}

function checkCountry(target) {
  if (!checkRegEx(COUNTRYEXPR, target.value)) {
    handleError(target, countryError, COUNTRY_INVALID);
  } else {
    setValid(target, countryError);
    return true;
  }
  return false;
}

function checkZip(target) {
  if (!checkMinLength(target.value, 3)) {
    handleError(target, zipError, `${TOO_SHORT} Enter at least 3 characters.`);
  } else if (!checkMaxLength(target.value, 10)) {
    handleError(
      target,
      zipError,
      `${TOO_LONG} Enter no more than 10 characters.`
    );
  } else if (!checkRegEx(ZIPEXPR, target.value)) {
    handleError(target, zipError, ZIP_INVALID);
  } else {
    setValid(target, zipError);
    return true;
  }

  // This field is not required. So it's ok if left out entirely.
  if (!checkRequired(target.value)) {
    setValid(target, zipError);
    return true;
  }

  return false;
}

function checkPWD(target) {
  if (!checkRequired(target.value)) {
    handleError(target, pwdError, REQUIRED_EMPTY);
  } else if (!checkMinLength(target.value, 8)) {
    handleError(target, pwdError, `${TOO_SHORT} Enter at least 8 characters.`);
  } else if (!checkMaxLength(target.value, 30)) {
    handleError(
      target,
      pwdError,
      `${TOO_LONG} Enter no more than 30 characters.`
    );
  } else if (
    !(
      checkRegEx(PWDEXPR_LETTER_UPPER, target.value) &&
      checkRegEx(PWDEXPR_LETTER_LOWER, target.value) &&
      checkRegEx(PWDEXPR_NUM, target.value)
    )
  ) {
    handleError(target, pwdError, PWD_INVALID);
  } else {
    setValid(target, pwdError);
    return true;
  }
  return false;
}

function checkPWDConfirm(target) {
  if (!comparePWD(target.value)) {
    handleError(target, confirmError, PWD_MATCH);
  } else {
    setValid(target, confirmError);
    return true;
  }
  return false;
}

// Listeners
signUp.addEventListener("click", () => {
  if (
    checkMail(email) &&
    checkCountry(country) &&
    checkZip(zipCode) &&
    checkPWD(pwd) &&
    checkPWDConfirm(pwdConfirm)
  ) {
    submitMessage.textContent =
      "Congratulations, you filled everything out correctly!";
  } else {
    submitMessage.textContent =
      "There's an error somewhere. Check your input and submit again.";
  }
});

email.addEventListener("focusout", (e) => {
  checkMail(e.currentTarget);
});

country.addEventListener("focusout", (e) => {
  checkCountry(e.currentTarget);
});

zipCode.addEventListener("focusout", (e) => {
  checkZip(e.currentTarget);
});

pwd.addEventListener("focusout", (e) => {
  checkPWD(e.currentTarget);
});

pwdConfirm.addEventListener("focusout", (e) => {
  checkPWDConfirm(e.currentTarget);
});
