import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressPanda } from "../addressABI/AddressPanda";

function ApproveToka() {

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const approvePanda = async () => {
    if(amount === "") {
      alert("Minimum approval amount is 1");
      return;
    }
    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 < 1) {
      alert("you have enough TOKA to add to the pool. First go to the Token Operations section and mint some TOKA");
      return;
    }
    let amount1 = parseInt(amount);
    if(amount1 < 1) {
      alert("Minimum approval amount is 1");
      return;
    }
    await contractTokenA.approvePanda(AddressPanda, amount1);
    setMessage("success, you approved Pool");
  }
  return (
    <div>
      <p>Before adding liquidity to the pool or swapping tokens, you need to "approve" PandaSwap contract <br />
      Approving does not mean transferring. So, if you plan to use PandaSwap contract with 100 toka and 200 toba <br />
      then, approve it with 200 toka and 400 toba.</p>
      <button onClick={approvePanda} className='button10'>Approve TokenA</button>
      <input type="number" placeholder='TOKA amount' className='inputFields'
         value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default ApproveToka;