import { useState, useEffect } from "react";
import { useAccount } from "../src/Store.js";
import { ethers } from "ethers";

function Main1() {
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
  let[num, setNum] = useState("");
  const getData = async () => {
    let data = await myContract.myNumber();
    let data2 = data.toString();
    setNum(data2);
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


  const changeNumber = async () => {
    await myContract.changeNum();
    
  }

  useEffect(() => {
    // Listen to the event emitted by the contract
    myContract.on('NumChanged', () => {
      generateAddress();
    });
    return () => {
      myContract.removeAllListeners();
    };
  }, [myContract]);


  return (
    <div>
        <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
        <p>{account}</p>
        <button onClick={getData}>GET DATA FROM CONTRACT</button>
        <p>{num}</p>
        <button onClick={changeNumber}>CHANGE NUMBER</button> <br />
        <button onClick={generateAddress}>GENERATE ADDRESS</button>
        <p>New address is: {newAddress}</p>
        <p>Key is: {newKey}</p>
    </div>
  );
}

export default Main1;
