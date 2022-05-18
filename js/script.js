//Personal Details
let nameField = document.querySelector("input#name");
let emailField = document.querySelector("input#email");
//Job
let selectJobRole = document.querySelector("select#title");
let otherField = document.querySelector("input#other-job-role");
//Shirts
let selectColorSection = document.querySelector("div#shirt-colors");
let selectColorDropdown = document.querySelector("select#color");
let selectColorList = document.querySelectorAll("select#color option");
let selectDesign = document.querySelector("select#design");
let jsPunsColors = document.querySelectorAll('option[data-theme="js puns"]');
let heartJsColors = document.querySelectorAll('option[data-theme="heart js"]');
//Activity list
let activityList = document.querySelector("fieldset#activities");
let total = document.querySelector("p#activities-cost");
let totalAmount = 0;
let activitiesBox = document.querySelector("div#activities-box");
let checkBoxes = document.querySelectorAll(
  'div#activities-box input[type="checkbox"]'
);
//Payments
let creditCard = document.querySelector('option[value="credit-card"]');
let paymentMethods = document.querySelector("fieldset.payment-methods");
let creditCardSection = document.querySelector("div#credit-card");
let paypalSection = document.querySelector("div#paypal");
let bitcoinSection = document.querySelector("div#bitcoin");
let form = document.querySelector("form");
let selectedPaymentMethod = document.querySelector("#payment");
let cardSelector = document.querySelector("input#cc-num");
let zipSelector = document.querySelector("input#zip");
let cvvSelector = document.querySelector("input#cvv");

//Initial load events
window.addEventListener("load", (e) => {
  //Focus on the input name field
  nameField.focus();
  //Other field hide on initial load
  otherField.style.display = 'none';

  //Select colour field hidden on initial load
  selectColorDropdown.disabled = true;
  //Default credit card payment option selected
  creditCard.setAttribute("selected", "");
  //Hide PayPal and Bitcoin section on initial load
  paypalSection.style.display = "none";
  bitcoinSection.style.display = "none";
});

//Display other field if 'other' option is selected for job role
selectJobRole.addEventListener("input", (e) => {
  if (e.target.value === "other") {
    otherField.style.display = '';
  } else {
    otherField.style.display = 'none';
  }
});

//Checking for which t-shirt design is selected and calling function
selectDesign.addEventListener("change", (e) => {
  if (e.target.value === "js puns") {
    for (let i = 0; i < selectColorList.length; i++) {
      selectColorList[i].removeAttribute('selected');
    }
    document.querySelector('select#color option[data-theme="js puns"]').setAttribute('selected', '', '');
    selectColorDropdown.disabled = false;
    colorChoices("puns");
  } else if (e.target.value === "heart js") {
    for (let i = 0; i < selectColorList.length; i++) {
      selectColorList[i].removeAttribute('selected');
    }
    document.querySelector('select#color option[data-theme="heart js"]').setAttribute('selected', '', '');
    selectColorDropdown.disabled = false;
    colorChoices("heart");
  }
});

//Function to display the right colours according to the t-shirt design selected
function colorChoices(choice) {
  selectColorSection.style.display = "";
  if (choice === "puns") {
    for (let i = 0; i < jsPunsColors.length; i++) {
      jsPunsColors[i].style.display = "";
    }
    for (let i = 0; i < heartJsColors.length; i++) {
      heartJsColors[i].style.display = "none";
    }
  } else if (choice === "heart") {
    for (let i = 0; i < heartJsColors.length; i++) {
      heartJsColors[i].style.display = "";
    }
    for (let i = 0; i < jsPunsColors.length; i++) {
      jsPunsColors[i].style.display = "none";
    }
  }
}

//Register for activities section listener event + calculations
activityList.addEventListener("change", (e) => {
  //For loop to prevent activities with same time from being selected
  for (let i = 0; i < checkBoxes.length; i++) {
    if (
      e.target.checked &&
      e.target.getAttribute("data-day-and-time") ===
        checkBoxes[i].getAttribute("data-day-and-time")
    ) {
      checkBoxes[i].disabled = true;
      checkBoxes[i].parentNode.classList.add("disabled");
      e.target.parentNode.classList.remove("disabled");
      e.target.disabled = false;
    }

    if (
      !e.target.checked &&
      e.target.getAttribute("data-day-and-time") ===
        checkBoxes[i].getAttribute("data-day-and-time")
    ) {
      checkBoxes[i].disabled = false;
      checkBoxes[i].parentNode.classList.remove("disabled");
      e.target.disabled = false;
      e.target.parentNode.classList.remove("disabled");
    }
  }

  let numberToAdd = parseInt(e.target.getAttribute("data-cost"));

  if (e.target.checked) {
    totalAmount += numberToAdd;
  } else if (!e.target.checked) {
    totalAmount -= numberToAdd;
  }

  total.textContent = `Total: $${totalAmount}`;
});

//Ensuring the focus is obvious for activities
for (let i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener("focus", (e) => {
    checkBoxes[i].parentNode.classList.add("focus");
  });
  checkBoxes[i].addEventListener("blur", (e) => {
    checkBoxes[i].parentNode.classList.remove("focus");
  });
}

//Checking for which payment method is selected and calling function
paymentMethods.addEventListener("change", (e) => {
  let value = e.target.value;
  if (value === "credit-card" || value === "paypal" || value === "bitcoin") {
    paymentSelector(value);
  }
});

//Function for the payment selector, which sections display depending on selection
function paymentSelector(choice) {
  if (choice === "credit-card") {
    creditCardSection.style.display = "";
    paypalSection.style.display = "none";
    bitcoinSection.style.display = "none";
  } else if (choice === "paypal") {
    creditCardSection.style.display = "none";
    paypalSection.style.display = "";
    bitcoinSection.style.display = "none";
  } else if (choice === "bitcoin") {
    creditCardSection.style.display = "none";
    paypalSection.style.display = "none";
    bitcoinSection.style.display = "";
  }
}

//Active validations upon type
nameField.addEventListener("keyup", (e) => {
  nameValidation(e);
});
emailField.addEventListener("keyup", (e) => {
  emailValidation(e);
});
activityList.addEventListener("change", (e) => {
  activityValidation(e);
});
creditCardSection.addEventListener("keyup", (e) => {
  creditCardValidation(e);
});

//Name validation
function nameValidation(e) {
  if (isValidName(nameField.value)) {
    positiveValidation(nameField);
  } else {
    negativeValidation(nameField);
    e.preventDefault();
  }
}

//Email validation
function emailValidation(e) {
  if (isValidEmail(emailField.value.toLowerCase())) {
    positiveValidation(emailField);
  } else if (emailField.value.length === 0) {
    negativeValidation(emailField);
    document.querySelector("span#email-hint").textContent =
      "Please enter an email.";
    e.preventDefault();
  } else {
    negativeValidation(emailField);
    document.querySelector("span#email-hint").textContent =
      "Email doesn't include all three: @ . and tld";
    e.preventDefault();
  }
}

//Activity validation
function activityValidation(e) {
  //Activity checkboxes
  if (isValidActivities(checkBoxes)) {
    activitiesBox.style.borderColor = "";
    activityList.classList.remove("not-valid");
    activityList.classList.add("valid");
    activityList.lastElementChild.style.display = "none";
  } else {
    activitiesBox.style.borderColor = "red";
    activityList.classList.add("not-valid");
    activityList.classList.remove("valid");
    activityList.lastElementChild.style.display = "inline";
    e.preventDefault();
  }
}

//Credit card validation
function creditCardValidation(e) {
  //Credit card
  if (selectedPaymentMethod.value === "credit-card") {
    let cc = cardSelector.value.replaceAll(" ", "");
    let zip = zipSelector.value.replaceAll(" ", "");
    let cvv = cvvSelector.value.replaceAll(" ", "");

    if (!isValidCC(cc, zip, cvv)) {
      e.preventDefault();
    }
  }
}

//Form validation event listener for submission
form.addEventListener("submit", (e) => {
  nameValidation(e);
  emailValidation(e);
  activityValidation(e);
  creditCardValidation(e);
});

//Checking the name entry is a valid
function isValidName(name) {
  let regex = /^[a-z ,.'-]+$/i;

  //Checking that name matches regex & name length is greater than 1 character
  if (regex.test(name)) {
    return true;
  } else {
    return false;
  }
}

//Checking the email entry is valid
function isValidEmail(email) {
  //best regex for email validation taken from https://emailregex.com/
  let regex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return regex.test(email);
}

//Checking that a checkbox has been selected
function isValidActivities(checkBoxes) {
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      return true;
    }
  }
  return false;
}

//Checking that the card details are valid
function isValidCC(card, zip, cvv) {
  //Visa, MasterCard, American Express, Diners Club, Discover, and JCB cards
  let regexForCD = /^([0-9]{13})?([0-9]{14})?([0-9]{15})?([0-9]{16})?$/;
  //Allowing both the five-digit and nine-digit ZIP code formats
  let regexForZip = /^[0-9]{5}$/;
  //Allows for 3 digit CVV's
  let regexForCvv = /^[0-9]{3}$/;
  let counter = 0;

  //Card validation checks
  if (regexForCD.test(card) && card.length > 12 && card.length < 17) {
    counter++;
    positiveValidation(cardSelector);
  } else if (/[a-zA-Z]/.test(card)) {
    counter--;
    negativeValidation(cardSelector);
    document.querySelector('span#cc-hint').textContent ='Card number must contain no letters.';
  } else {
    counter--;
    negativeValidation(cardSelector);
  }

  //Zip code validation checks: test number 12345
  if (regexForZip.test(zip) && zip.length === 5) {
    counter++;
    positiveValidation(zipSelector);
  } else if (/[a-zA-Z]/.test(zip)) {
    counter--;
    negativeValidation(zipSelector);
    document.querySelector('span#zip-hint').textContent ='Zip code must contain no letters.';
  } else {
    counter--;
    negativeValidation(zipSelector);
  }

  //CVV validation checks: test number 123
  if (regexForCvv.test(cvv) && cvv.length === 3) {
    counter++;
    positiveValidation(cvvSelector);
  } else if (/[a-zA-Z]/.test(cvv)) {
    counter--;
    negativeValidation(cvvSelector);
    document.querySelector('span#cvv-hint').textContent ='CVV must contain no letters.';
  } else {
    counter--;
    negativeValidation(cvvSelector);
  }

  if (counter === 3) {
    return true;
  } else {
    return false;
  }
}

//Function for negative validation to prevent duplication of code
function negativeValidation(type) {
  type.style.borderColor = "Red";
  type.parentNode.classList.add("not-valid");
  type.parentNode.classList.remove("valid");
  type.parentNode.lastElementChild.style.display = "inline";
}

//Function for positive validation to prevent duplication of code
function positiveValidation(type) {
  type.style.borderColor = "";
  type.parentNode.classList.remove("not-valid");
  type.parentNode.classList.add("valid");
  type.parentNode.lastElementChild.style.display = "none";
}