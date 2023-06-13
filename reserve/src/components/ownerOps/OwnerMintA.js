import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../addressABI/AddressOwner";

function OwnerMintA() {

  const { ethereum } = window;

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const mintToken = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      setMessage("You are not owner");
      return;
    } else {
      let amount1 = parseInt(amount);
      await contractTokenA.mintToken(amount1);
      setMessage("success, you minted", amount1," tokens");
    }
  }

  return (
    <div>
        <button onClick={mintToken} className='button4'>Mint TokenA</button>
        <input type="number" className='inputFields'
          value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerMintA