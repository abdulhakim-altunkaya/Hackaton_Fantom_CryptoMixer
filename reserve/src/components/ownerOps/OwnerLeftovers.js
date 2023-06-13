import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressOwner } from "../addressABI/AddressOwner";

function OwnerLeftovers() {

  const { ethereum } = window;

  const contractPanda = useAccount(state => state.contractPanda2);
  let [message, setMessage] = useState("");

  const getLeftovers = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      setMessage("You are not owner");
      return;
    } else {
      await contractPanda.withdrawLeftoverTokens();
    }
  }

  return (
    <div>
        <button onClick={getLeftovers} className='button4'>Withdraw Profit</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerLeftovers;