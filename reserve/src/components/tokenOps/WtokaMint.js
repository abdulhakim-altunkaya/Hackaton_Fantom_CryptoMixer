import React, { useState } from 'react';
import { useAccount } from '../../Store';  


function WtokaMint() {

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const mintToken = async () => {
    if(amount === "") {
      alert("Please mint at least 1");
      return;
    }
    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 > 1000) {
      alert("you have more than 1000 TOKA. You cannot mint more");
      return;
    }
    let amount1 = parseInt(amount);
    if(amount1 > 499) {
      alert("You cannot mint more than 499");
      return;
    } else if(amount1 < 1) {
      alert("Please mint at least 1 token");
      return;
    }
    await contractTokenA.mintTokenGenerals(amount1);
    setMessage("success, you minted", amount1," tokens");
  }
  return (
    <div>
      <button onClick={mintToken} className='button4'>Mint TokenA</button>
      <input type="number" placeholder='Mint 1-499' className='inputFields'
         value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default WtokaMint