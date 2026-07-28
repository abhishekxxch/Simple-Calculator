import { useState } from "react";
import "./calculator.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/calculate";

function Calculator() {
  const [display, setDisplay] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const handleEqual = async () => {
    const expression = display.trim();

    if (!expression) {
      setDisplay("");
      return;
    }

    try {
      setIsCalculating(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to calculate");
      }

      setDisplay(String(data.result));
    } catch (error) {
      setDisplay(error.message || "Invalid Expression");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={display} readOnly className="display" />

      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>DEL</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={handleEqual} disabled={isCalculating}>
          {isCalculating ? "..." : "="}
        </button>

        <button className="zero" onClick={() => handleClick("0")}>
          0
        </button>

        <button onClick={() => handleClick(".")}>.</button>
      </div>
    </div>
  );
}

export default Calculator;