import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressOwner } from "../addressABI/AddressOwner";

function OwnerRemoveB() {

  const { ethereum } = window;

  const contractPanda = useAccount(state => state.contractPanda2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const decreaseB = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner");
      setMessage("You are not owner");
      return;
    } else {
      let amount1 = parseInt(amount);
      await contractPanda.removeLiquidityTokenB(amount1);
      setMessage("Pool decreased by", amount1," TOBA");
    }
  }

  return (
    <div>
        <button onClick={decreaseB} className='button4'>Decrease Toba</button>
        <input type="number" className='inputFields'
          value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerRemoveB;