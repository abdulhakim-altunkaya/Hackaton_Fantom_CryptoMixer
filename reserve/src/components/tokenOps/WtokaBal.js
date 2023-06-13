import React from 'react'
import { useState } from 'react';
import { useAccount } from '../../Store';  

function WtokaBal() {

    const contractTokenA = useAccount(state => state.contractTokenA2);

    let [balance, setBalance] = useState("");

    const getBalanceA = async () => {
      let bal = await contractTokenA.getYourBalance();
      setBalance(bal.toNumber());
    }
    return (
        <div>
            <button onClick={getBalanceA} className='button4'>See Balance</button>
            <span className='spanTokens'>User TokenA Balance: {balance}</span>
        </div>
    )
}

export default WtokaBal;