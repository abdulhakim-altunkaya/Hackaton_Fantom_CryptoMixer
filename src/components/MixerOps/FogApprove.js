import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressCoinfog } from "../AddressABI/AddressCoinfog";


function FogApprove() {

  let contractTokenA = useAccount(state => state.contractTokenA2);

  let [message, setMessage] = useState("");
  let [amount, setAmount] = useState("");

  const approveCoinFog = async () => {

    let amount1 = parseInt(amount);

    if(amount1 === "") {
      alert("Approve amount cannot be empty (security check 1)");
      return;
    }

    if(amount === "") {
      alert("Approve amount cannot be empty (security check 2)");
      return
    }

    if(amount1 < 1) {
      alert("Minimum amount is 1 toka (security check 3)");
      return;
    }

    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);

    if(userBalance3 < 1) {
      alert("You dont have TokenA to approve. First mint some TokenA (security check 3)");
      return;
    }

    await contractTokenA.approveCoinFog(AddressCoinfog, amount1);
    setMessage(`Success, approval amount: ${amount1} TOKA`);

  }

  return (
    <div>
      <p>
        To use this system: <br />
        1. Mint some TokenA ("TOKA") in "Token Operations" section. <br />
        2. Make sure you are on Fantom testnet and have some FTM testnet coins. <br />
        3. Approve the system with any amount.The approve amount must be smaller than <br />
        your TokenA balance but it must be bigger than the amount that you plan to deposit. <br />
        4. Think of a private keyword, like a password. Then write it in the "Create a Hash" input area <br />
        and click on "Create a Hash". It will give you a hash and it should start with "0x". <br />
        5. Save your private word and its hash. <br />
        6. Then go to "Deposit" button input area, enter hash and the TOKA amount you want to deposit. <br />
      </p>
      <button className='button10' onClick={approveCoinFog}>Approve</button>
      <input type="number" className='inputFields' placeholder='TokenA amount'
      value={amount} onChange={ e => setAmount(e.target.value)} /> {message}
    </div>
  )
}

export default FogApprove;




    