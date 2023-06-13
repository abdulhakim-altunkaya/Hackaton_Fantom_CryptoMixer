import React from 'react'
import { useState } from 'react';
import { useAccount } from '../../Store';  


function WtokaBurn() { 

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const burnToken = async () => {
    if(amount === "") {
      alert("Please mint at least 1");
      return;
    }
    let amount1 = parseInt(amount);
    if(amount1 < 1) {
      alert("You need to burn at least 1 token");
      return;
    }
    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 < 1) {
      alert("you dont have TokenA");
      return;
    }
    await contractTokenA.burnToken(amount1);
    setMessage("success, you burned", amount1," tokens");
  }
  return (
  <div>
      <button onClick={burnToken} className='button4'>Burn TokenA</button>
      <input type="number" placeholder='enter amount' className='inputFields'
        value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default WtokaBurn;