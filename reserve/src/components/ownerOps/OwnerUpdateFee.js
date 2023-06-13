import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressOwner } from "../addressABI/AddressOwner";


function OwnerUpdateFee() {
  const { ethereum } = window;

  const contractPanda = useAccount(state => state.contractPanda2);
  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const changeFee = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      setMessage("You are not owner");
      return;
    } else {
      let amount1 = parseInt(amount);
      await contractPanda.updateFeePercentage(amount1);
      setMessage("success, fee updated");
    }
  }

  return (
    <div>
        <p>Fee percentage update: for example, enter "4" for 0.4%. Maximum is 2.9%. Default is 0.1%</p>
        <button onClick={changeFee} className='button4'>Update Fee</button>
        <input type="number" className='inputFields'
          value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerUpdateFee