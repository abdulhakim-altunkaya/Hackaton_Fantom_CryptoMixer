import React, {useState} from 'react'
import { useAccount } from '../../Store';

function SwapAwithB() {

  const contractPanda = useAccount(state => state.contractPanda2);

  let [message, setMessage] = useState("");
  let [amountA, setAmountA] = useState("");
  let [amountBmin, setAmountBmin] = useState("");

  const swapA = async (e) => {
    e.preventDefault();
    let amount1 = parseInt(amountA);
    let amount2 = parseInt(amountBmin);
    if(amount1 < 1 ) {
      alert("Please add more than 1 TOKA");
      return;
    } else {
      if(amount2 < 1) {
        alert("Min desired TOBA amount must be bigger than 1");
        return;
      } else {
        await contractPanda.swapAwithB(amount1, amount2);
        setMessage("success, you swapped TOKA with TOBA");
      }
    }
  }

  return (
    <div>
      <br />
      <p>To swap TokenA with TokenB: <br />
        1. Enter the amount of TokenA you want to swap <br />
        2. Enter a minimum amount TokenB that you desire. This <br />
        minimum amount is only a security caution to protect you against slippage. <br />
        You can also follow the same logic for swapping B with A.
      </p>
      <form onSubmit={swapA}>
        <input type='submit' value={"Swap A with B"} className='button10' />
        <input type="number" className='inputFields' placeholder='enter TOKA'
          value={amountA} onChange={ e => setAmountA(e.target.value)} required />
        <input type="number" className='inputFields' placeholder='enter min TOBA'
          value={amountBmin} onChange={ e => setAmountBmin(e.target.value)} required /> <br />
          {message}
      </form>
    </div>
  )
}

export default SwapAwithB 