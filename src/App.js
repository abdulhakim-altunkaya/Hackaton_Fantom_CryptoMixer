import { useState } from "react";
import { useAccount } from "./Store.js";

function App() {
  const {ethereum} = window;

  let[account, setAccount] = useState("");
  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts"});
      setAccount(accounts[0]);
    } else {
      alert("download metamask extension on your browser")
    }
  }


  const myContract = useAccount(state => state.contract);
  let[city, setCity] = useState("");
  const getData = async () => {
    let data = await myContract.myNumber();
    let data2 = data.toString();
    setCity(data2);
  }

  return (
    <div className="App">
        <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
        <p>{account}</p>
        <button onClick={getData}>GET DATA FROM CONTRACT</button>
        <p>{city}</p>
        <button>TEST BUTTON</button>
        <p></p>
    </div>
  );
}

export default App;
