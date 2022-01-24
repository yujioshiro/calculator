let operator;
let firstNumber, secondNumber, round = 1;
let lowerDisplayText = document.getElementById("digits-display-lower");
let upperDisplayText = document.getElementById("digits-display-upper");

const equalsClick = () => {
  if (operator && round == 1) {
    upperDisplayText.innerText = upperDisplayText.innerText.concat(" ", lowerDisplayText.innerText);
    secondNumber = lowerDisplayText.innerText;
    lowerDisplayText.innerText = operate(operator, firstNumber, secondNumber);
    round++;
  } else if (operator) {
    upperDisplayText.innerText = `${lowerDisplayText.innerText} ${operator} ${secondNumber}`;
    firstNumber = lowerDisplayText.innerText;
    lowerDisplayText.innerText = operate(operator, firstNumber, secondNumber);
  } else {

  }
}

const clearAll = () => {
  lowerDisplayText.innerText = "";
  upperDisplayText.innerText = "";
  operator = undefined;
  firstNumber = undefined;
  secondNumber = undefined;
  round = 1;
}

const operate = (operator, firstNumber, secondNumber) => {
  let result;
  let x = parseFloat(firstNumber);
  let y = parseFloat(secondNumber);

  if (operator == "+") {
    result = x + y;
  } else if (operator == "-") {
    result = x - y;
  } else if (operator == "*") {
    result = x * y;
  } else if (operator == "/") {
    result = x / y;
  } else {
    //do nothing if operator is not selected correctly
  }

  if (result.toString().length < 12) {
    return result;
  } else {
    return result.toExponential(5);
  }
}

const addDigit = (number) => {
  let inputDisplay = lowerDisplayText.innerText;
  if (inputDisplay.length >= 12) {
    maxCharactersDetected();
  } else if (inputDisplay.length == 0){
    if (number == "0") {
    } else {
      lowerDisplayText.innerText = inputDisplay.concat("", number);
    }
  } else {
    lowerDisplayText.innerText = inputDisplay.concat("", number);
  }
}

const addOperator = (operatorButton) => {
  if (lowerDisplayText.innerText) {
    round = 1;
    operator = operatorButton;
    firstNumber = lowerDisplayText.innerText;
    upperDisplayText.innerText = lowerDisplayText.innerText.concat(" ", operator);
    lowerDisplayText.innerText = "";
  }
}

const addDecimal = () => {
  if (!(lowerDisplayText.innerText.includes(".")) && (lowerDisplayText.innerText.length <= 10)) {
    lowerDisplayText.innerText = lowerDisplayText.innerText.concat("", ".");
  }
}

const percent = () => {
  let newNumber = parseFloat(lowerDisplayText.innerText) / 100;
  if (newNumber.toString().length <= 12) {
    lowerDisplayText.innerText = newNumber;
  } else {
    return lowerDisplayText.innerText = newNumber.toExponential(5);
  }
};

const playSound = (buttonType) => {
  if (buttonType == "equals") {
    const sound = new Audio("audio/src_assets_audio_bluealps_press_ENTER.mp3");
    sound.play();
  } else {
    const sound = new Audio("audio/src_assets_audio_bluealps_press_GENERIC_R0.mp3");
    sound.play();
  }
}

const maxCharactersDetected = () => {
  let maxDigitWarning = document.createElement("p");
  maxDigitWarning.id = "max-digit-warning"
  maxDigitWarning.innerText = "MAX DIGITS ENTERED";
  document.getElementById("digits-display-upper").appendChild(maxDigitWarning);

  [].forEach.bind(document.getElementsByClassName("button"), function(itm) {
    itm.classList.add("disabled");
  })();

  var blink_speed = 500; // every 1000 == 1 second, adjust to suit
  var t = setInterval(function() {
    maxDigitWarning.style.visibility = (maxDigitWarning.style.visibility == 'hidden' ? '' : 'hidden');
  }, blink_speed);

  setTimeout(clearBlinking, 2300);
}

const clearBlinking = () => {
  let maxDigitWarning = document.getElementById("max-digit-warning");
  document.getElementById("digits-display-upper").removeChild(maxDigitWarning);

  [].forEach.bind(document.getElementsByClassName("button"), function(itm) {
    itm.classList.remove("disabled");
  })();
}
