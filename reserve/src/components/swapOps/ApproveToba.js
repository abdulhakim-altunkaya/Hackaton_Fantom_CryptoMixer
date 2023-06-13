import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressPanda } from "../addressABI/AddressPanda";

function ApproveToba() {

  const contractTokenB = useAccount(state => state.contractTokenB2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const approvePanda = async () => {
    if(amount === "") {
      alert("Minimum approval amount is 1");
      return;
    }
    let userBalance = await contractTokenB.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 < 1) {
      alert("you have enough TOBA to add to the pool. First go to the Token Operations section and mint some TOBA");
      return;
    }
    let amount1 = parseInt(amount);
    if(amount1 < 1) {
      alert("Minimum approval amount is 1");
      return;
    }
    await contractTokenB.approvePanda(AddressPanda, amount1);
    setMessage("success, you approved Pool");
  }
  return (
    <div>
      <button onClick={approvePanda} className='button10'>Approve TokenB</button>
      <input type="number" placeholder='TOBA amount' className='inputFields'
         value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default ApproveToba;