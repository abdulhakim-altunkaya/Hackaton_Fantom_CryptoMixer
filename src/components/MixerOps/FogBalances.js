import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  

function FogBalances() {

  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  let [displayStatus, setDisplayStatus] = useState(false);
  let [balanceTokenA, setBalanceTokenA] = useState("");
  let [txFee, setTxFee] = useState("");


  const getBalances = async () => {
    setDisplayStatus(!displayStatus);
    let fee = await contractCoinFog.fee();
    let fee2 = fee / (10**18);
    let tokaBalance = await contractCoinFog.getContractTokenBalance();
    setBalanceTokenA(tokaBalance.toString())
    setTxFee(fee2.toString());
  }

  return (
    <div>
      <button onClick={getBalances} className='button10'>GET BALANCES</button> <br />
      {
        displayStatus ?
        <>
          <strong><span>CoinFog TokenA Pool Balance:</span></strong> {balanceTokenA} TokenA<br />
          <strong>Deposit and Withdrawal Fee:</strong> {txFee} FTM <br /> <br />
        </>
        :
        <></>
      }
    </div>
  )
}

export default FogBalances;