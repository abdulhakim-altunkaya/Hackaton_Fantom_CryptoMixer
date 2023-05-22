import { useState } from "react";
import { useAccount } from "./Store.js";
import { ethers } from "ethers";

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

  let [newAddress, setNewAddress] = useState("");
  let [newKey, setNewKey] = useState("");
  const generateAddress = () => {
    const wallet = ethers.Wallet.createRandom();
    const addressData = wallet.address;
    const keyData = wallet.privateKey;
    setNewAddress(addressData);
    setNewKey(keyData);
  }

  return (
    <div className="App">
        <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
        <p>{account}</p>
        <button onClick={getData}>GET DATA FROM CONTRACT</button>
        <p>{city}</p>
        <button onClick={generateAddress}>GENERATE ADDRESS</button>
        <p>New address is: {newAddress}</p>
        <p>Key is: {newKey}</p>
    </div>
  );
}

export default App;
