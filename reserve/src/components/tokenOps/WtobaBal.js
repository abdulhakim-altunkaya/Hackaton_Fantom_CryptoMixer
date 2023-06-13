import React from 'react'
import { useState } from 'react';
import { useAccount } from '../../Store';  

function WtobaBal() {

    const contractTokenB = useAccount(state => state.contractTokenB2);

    let [balance, setBalance] = useState("");

    const getBalanceB = async () => {
      let bal = await contractTokenB.getYourBalance();
      setBalance(bal.toNumber());
    }
    return (
        <div>
            <button onClick={getBalanceB} className='button4'>See Balance</button>
            <span className='spanTokens'>User TokenB Balance: {balance}</span>
        </div>
    )
}

export default WtobaBal;