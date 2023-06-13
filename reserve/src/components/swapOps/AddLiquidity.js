import React, {useState} from 'react'
import { useAccount } from '../../Store';

function AddLiquidity() {

  const contractPanda = useAccount(state => state.contractPanda2);

  let [message, setMessage] = useState("");
  let [amountA, setAmountA] = useState("");
  let [amountB, setAmountB] = useState("");

  const addLiq = async (e) => {
    if(amountA === "" || amountB === "") {
      alert("enter some values");
      return;
    }
    e.preventDefault();
    let amount1 = parseInt(amountA);
    let amount2 = parseInt(amountB);
    if(amount1 < 1 ) {
      alert("Please add more than 1 TOKA");
      return;
    }
    if(amount2 < 1) {
      alert("Please add more than 1 TOBA");
      return;
    }
    await contractPanda.addLiquidity(amount1, amount2);
    setMessage("success, pool increased");
  } 

  return (
    <div>
      <form onSubmit={addLiq}>
        <input type='submit' value={"Add Liquidity"} className='button10' />
        <input type="number" className='inputFields' placeholder='amount TOKA'
          value={amountA} onChange={ e => setAmountA(e.target.value)} required />
        <input type="number" className='inputFields' placeholder='amount TOBA'
          value={amountB} onChange={ e => setAmountB(e.target.value)} required /> <br />
          {message}
      </form>

    </div>
  )
}

export default AddLiquidity;