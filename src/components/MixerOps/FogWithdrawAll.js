import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { useMediaQuery } from 'react-responsive';

function FogWithdrawAll() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);
  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [message, setMessage] = useState("");
  let [privateWord, setPrivateWord] = useState("");
  let [receiver, setReceiver] = useState("");

  const withdrawAll = async () => {
    
  }

  return (
    <div>
        <button className='button10' onClick={withdrawAll}>Withdraw All</button>{isMobile ? <br /> : ""}
        <input type="text" className='inputFields' placeholder='private keyword'
        value={privateWord} onChange={e => setPrivateWord(e.target.value)} />
        <input type="text" className='inputFields' placeholder='receiver address'
        value={receiver} onChange={e => setReceiver(e.target.value)} /> {message}
    </div>
  )
}

export default FogWithdrawAll