const display = document.querySelector("#display .input");
const resultDisplay = document.querySelector("#display .result");

let currentInput = "";
let lastResult = "";
let justEvaluated = false; // flag to track if "=" was just pressed

function updateDisplay() {
  display.textContent = currentInput;
  resultDisplay.textContent = lastResult || "0";
}

function handleInput(value) {
  // Clear All
  if (value === "C") {
    currentInput = "";
    lastResult = "";
    justEvaluated = false;
    updateDisplay();
  }

  // Clear Entry / Backspace
  else if (value === "CE" || value === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  // Equals (= or Enter)
  else if (value === "=" || value === "Enter") {
    try {
      const result = eval(currentInput);
      lastResult = result.toString();
      currentInput = lastResult; // keep result for further ops
      justEvaluated = true; // mark evaluation happened
      updateDisplay();
    } catch {
      lastResult = "Error";
      currentInput = "";
      justEvaluated = false;
      updateDisplay();
    }
  }

  // Numbers & operators
  else {
    if (justEvaluated) {
      // If last action was "=", handle differently
      if (["+", "-", "*", "/", "%"].includes(value)) {
        // Continue calculation from result
        currentInput = lastResult + value;
      } else {
        // Start a new calculation
        currentInput = value;
        lastResult = "";
      }
      justEvaluated = false;
    } else {
      // Normal typing
      currentInput += value;
    }
    updateDisplay();
  }
}

// ---- Button clicks ----
Array.from(document.getElementsByTagName("button")).forEach(button => {
  button.addEventListener("click", () => handleInput(button.id));
});

// ---- Keyboard input ----
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    handleInput(key);
  } else if (key === "Enter" || key === "=") {
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("Backspace");
  } else if (key.toUpperCase() === "C") {
    handleInput("C");
  }
});

// Init display
updateDisplay();
