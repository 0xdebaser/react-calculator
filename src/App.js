import "./App.css";
import { keysArray, keyLabels } from "./keysData";
import Key from "./key.component";

let decimalUsed = false;
let inputArray = [];

function App() {
  function isANumber(input) {
    if (parseFloat(input) || input === "0") {
      return true;
    } else return false;
  }

  function addToLastInputArrayElement(keyPressed) {
    const newNumber = inputArray.pop() + keyPressed;
    inputArray.push(newNumber);
  }

  //updates the display to show the last number element in inputArray
  function updateDisplay() {
    const displayEl = document.getElementById("display");
    if (inputArray.length > 0) {
      for (let i = inputArray.length - 1; i >= 0; i--) {
        console.log(inputArray[i]);
        console.log(isANumber(inputArray[i]));
        if (isANumber(inputArray[i])) {
          displayEl.innerText = inputArray[i];
          return;
        }
      }
    }
    // sets display at 0 if there is no number in inputArray
    displayEl.innerText = "0";
  }

  function clickHandler(event) {
    const keyPressed = event.target.innerText;
    const lastInputArrayEl = inputArray[inputArray.length - 1];
    // Handles number pressed
    console.log(isANumber(keyPressed));
    if (isANumber(keyPressed)) {
      //if the last element in inputArray is a number, add the key press to the number
      if (inputArray.length > 0 && isANumber(lastInputArrayEl)) {
        addToLastInputArrayElement(keyPressed);
      } else {
        //prevents leading zeros
        if (keyPressed > 0) {
          inputArray.push(keyPressed);
        }
      }
    } else {
      // Handles all key presses other than numbers
      switch (keyPressed) {
        case ".":
          if (!decimalUsed) {
            if (isANumber(lastInputArrayEl)) {
              addToLastInputArrayElement(keyPressed);
            } else {
              inputArray.push("0.");
            }
            decimalUsed = true;
          }
          break;
        case "AC":
          reset();
          break;
        case "=":
          calculate();
          decimalUsed = false;
          break;
        //default handles all operators
        default:
          console.log("Default case of click handler.");
          if (inputArray.length > 0) {
            inputArray.push(keyPressed);
          }
          decimalUsed = false;
      }
    }
    updateDisplay();
    console.log(inputArray);
  }

  function calculate() {
    let result;
    let activeOperator;
    let input0;
    let input1;
    let negative = false;
    // loop through input array and perform specified actions
    for (let i = 0; i < inputArray.length; i++) {
      if (!input0 & isANumber(inputArray[i])) {
        input0 = parseFloat(inputArray[i]);
      } else if (!isANumber(inputArray[i])) {
        if (inputArray[i] === "-" && !isANumber(inputArray[i - 1])) {
          negative = true;
        } else {
          activeOperator = inputArray[i];
          negative = false;
        }
      } else {
        input1 = parseFloat(inputArray[i]);
        switch (activeOperator) {
          case "+":
            result = input0 + (negative ? input1 * -1 : input1);
            break;
          case "-":
            result = input0 - (negative ? input1 * -1 : input1);
            break;
          case "X":
            result = input0 * (negative ? input1 * -1 : input1);
            break;
          case "/":
            result = input0 / (negative ? input1 * -1 : input1);
            break;
          default:
            console.log(
              "You've reached the default case of the calculate switch statement. How odd."
            );
        }
        input0 = result;
        activeOperator = null;
        negative = false;
      }
    }
    decimalUsed = false;
    inputArray = [result];
    updateDisplay();
  }

  function reset() {
    inputArray = [];
    updateDisplay();
    decimalUsed = false;
  }

  return (
    <div className="App">
      <div id="calculator-body">
        <div id="display">0</div>
        <div id="keys-container">
          {keysArray.map((key, index) => {
            return (
              <Key
                key={index}
                keyName={key}
                keyLabel={keyLabels[key]}
                clickHandler={clickHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
