// Select the display elements
// "input" is where typed numbers/operators will show
// "result" is where the evaluated result (=) will show
const input = document.querySelector("#display .input");
const resultDisplay = document.querySelector("#display .result");

// Select all calculator buttons
const buttons = document.getElementsByTagName('button');

// Store the current input string (what the user types)
let currentInput = "";

// Convert HTMLCollection (buttons) to array and loop through each button
Array.from(buttons).forEach(button => {
    button.addEventListener("click", () => {
        // Get the value from the button (using its id attribute)
        const value = button.id;

        // --- Handle different button cases ---

        // CASE 1: Clear All (C)
        if (value === "C") {
            currentInput = "";                   // reset the input
            input.textContent = "";            // clear typed expression
            resultDisplay.textContent = "";     // reset result to 0
        }

        // CASE 2: Clear Entry (CE → remove last character only)
        else if (value === "CE") {
            currentInput = currentInput.slice(0, -1);  // remove last char
            input.textContent = currentInput;        // update expression display
        }

        // CASE 3: Equal (= → evaluate expression)
        else if (value === "=") {
            try {
                const result = eval(currentInput);     // evaluate safely
                resultDisplay.textContent = result;    // show result
                currentInput = result.toString();      // allow further operations
            }
            catch {
                resultDisplay.textContent = "Error";   // invalid expression
                currentInput = "";                     // reset input
            }
        }

        // CASE 4: Any other button (numbers/operators)
        else {
            currentInput += value;                     // add pressed key to string
            input.textContent = currentInput;        // show updated expression
        }
    });
});
