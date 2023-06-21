import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerFee() {

  const ethereum = {window};

  let contractCoinFog = useAccount(state => state.contractCoinfog2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const changeFee = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts"});
    let amount1 = parseInt(amount);

    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner (Security check 1)");
      return;
    }

    if(amount1 < 0 || amount1 > 19) {
      alert("You cannot set less than 0 and more than 20 FTM");
      return;
    }

    if(amount === "") {
      alert("You cannot leave amount area empty");
      return;
    }

    await contractCoinFog.setFee(amount1);
    setMessage("You successfully changed fee");

  }

  return (
    <div>
      <p>Fee is 5 FTM. Each time you deposit or withdraw, you'll need to pay 5 FTM. This fee
        is mainly to keep scammers away from the system.
      </p>
      <button onClick={changeFee} className='button4'>Update Fee</button>
      <input type="number" className='inputFields' placeholder='enter new fee'
      value={amount} onChange={(e) => setAmount(e.target.value)} /> {message}
    </div>
  )
}

export default OwnerFee;

 