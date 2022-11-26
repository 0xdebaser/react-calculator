import { useEffect, useState } from "react";

import "./App.css";
import { keysArray, keyLabels } from "./keysData";
import Key from "./key.component";

let activeOperator = null;
let activeInput = 0;
let decimalUsed = false;
let input0 = "";
let input1 = "";

function App() {
  const [displayValue, setDisplayValue] = useState(0);
  // const [input0, setInput0] = useState("");
  // const [input1, setInput1] = useState("");

  const displayEl = document.getElementById("display");

  function clickHandler(event) {
    const keyPressed = event.target.innerText;
    // Handles number pressed
    console.log("Active input:", activeInput);
    if (keyPressed >= 0) {
      // the second part of the logic prevents more than 1 leading zero from being entered)
      if (activeInput === 0 && (keyPressed !== "0" || input0)) {
        // setInput0(input0 + keyPressed);
        input0 += keyPressed;
        displayEl.innerText = input0;
      } else if (activeInput === 1 && (keyPressed !== "0" || input1)) {
        //setInput1(input1 + keyPressed);
        input1 += keyPressed;
      }
    } else {
      // Handles all key presses other than numbers
      switch (keyPressed) {
        case ".":
          if (!decimalUsed) {
            if (activeInput === 0) {
              //input0 ? setInput0(input0 + keyPressed) : setInput0("0.");
              input0 ? (input0 += keyPressed) : (input0 = "0.");
            } else {
              //input1 ? setInput1(input1 + keyPressed) : setInput1("0.");
              input1 ? (input1 += keyPressed) : (input1 = "0.");
            }
            decimalUsed = true;
          }
          break;
        case "AC":
          reset();
          break;
        case "=":
          calculate();
          break;
        //default handles all operators
        default:
          //TODO: address case where operator should perform equals operation
          if (activeOperator) {
            calculate();
          }
          activeOperator = keyPressed;
          activeInput = 1;
          decimalUsed = false;
          setDisplayValue(0);
      }
    }
    if (input1) {
      displayEl.innerText = input1;
    } else {
      displayEl.innerText = input0 ? input0 : "0";
    }
  }

  function calculate() {
    switch (activeOperator) {
      case "+":
        //setInput0(parseFloat(input0) + parseFloat(input1));
        input0 = parseFloat(input0) + parseFloat(input1);
        //setInput1("");
        input1 = "";
        break;
      case "-":
        //setInput0(parseFloat(input0) - parseFloat(input1));
        input0 = parseFloat(input0) - parseFloat(input1);
        //setInput1("");
        input1 = "";
        break;
      case "X":
        //setInput0(parseFloat(input0) * parseFloat(input1));
        input0 = parseFloat(input0) * parseFloat(input1);
        //setInput1("");
        input1 = "";
        break;
      case "/":
        //setInput0(parseFloat(input0) / parseFloat(input1));
        input0 = parseFloat(input0) / parseFloat(input1);
        //setInput1("");
        input1 = "";
        break;
      default:
        console.log("No active operator.");
    }
    activeInput = 0;
    activeOperator = null;
    decimalUsed = false;
  }

  function reset() {
    setDisplayValue(0);
    //setInput0("");
    input0 = "";
    //setInput1("");
    input1 = "";
    activeOperator = null;
    activeInput = 0;
    decimalUsed = false;
  }

  //handles updating the display value based on the active input array
  // useEffect(() => {
  //   if (activeInput === 0 && input0) {
  //     setDisplayValue(input0);
  //   } else if (activeInput === 1 && input1) {
  //     setDisplayValue(input1);
  //   }
  // }, [input0, input1]);

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
