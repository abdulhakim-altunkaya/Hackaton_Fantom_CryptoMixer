import { useState } from "react";
import { useAccount } from "./Store.js";

function App() {
  const {ethereum} = window;
  return (
    <div className="App">
        <button>CONNECT TO METAMASK</button>
        <p></p>
        <button>CONNECT TO CONTRACT</button>
        <p></p>
        <button>TEST BUTTON</button>
        <p></p>
    </div>
  );
}

export default App;
