import React, { useState } from "react";
import './App.css';

function App() {
  // Set up state for the counter, starting at 0
  const [count, setCount] = useState(0);

  // Function to increment the counter
  const increment = () => {
    setCount(count + 1);
  };

  // Function to decrement the counter
  const decrement = () => {
    if(count > 0){
      setCount(count - 1);
    } else {
      setCount(0);
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>

        {/* Display the current counter */}
        <p>Current Count: {count}</p>

        {/* Buttons to increment and decrement */}
        <button className="App-button" onClick={increment}>
          Increment
        </button>
        <button className="App-button" onClick={decrement}>
          Decrement
        </button>
      </header>
    </div>
  );
}

export default App;
