const display = document.getElementById("display");

function clearDisplay() {
  display.textContent = "0";
}

function appendToDisplay(value) {
  if (display.textContent === "0" && value !== ".") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function calculateResult() {
  try {
    display.textContent = eval(display.textContent);
  } catch (e) {
    display.textContent = "Error";
  }
}
