import React, {useState} from 'react'
import { useAccount } from '../../Store';

function SwapBwithA() {

  const contractPanda = useAccount(state => state.contractPanda2);

  let [message, setMessage] = useState("");
  let [amountB, setAmountB] = useState("");
  let [amountAmin, setAmountAmin] = useState("");

  const swapB = async (e) => {
    e.preventDefault();
    let amount1 = parseInt(amountB);
    let amount2 = parseInt(amountAmin);
    if(amount1 < 1 ) {
      alert("Please add more than 1 TOBA");
      return;
    } else {
      if(amount2 < 1) {
        alert("Min desired TOKA amount must be bigger than 1");
        return;
      } else {
        await contractPanda.swapBwithA(amount1, amount2);
        setMessage("success, you swapped TOBA with TOKA");
      }
    }
  }

  return (
    <div>
      <br />
      <form onSubmit={swapB}>
        <input type='submit' value={"Swap B with A"} className='button10' />
        <input type="number" className='inputFields' placeholder='enter TOBA'
          value={amountB} onChange={ e => setAmountB(e.target.value)} required />
        <input type="number" className='inputFields' placeholder='enter min TOKA'
          value={amountAmin} onChange={ e => setAmountAmin(e.target.value)} required /> <br />
          {message}
      </form>
    </div>
  )
}

export default SwapBwithA;