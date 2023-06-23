import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressCoinfog } from "../AddressABI/AddressCoinfog";

function FogBalances() {

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);
  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [displayStatus, setDisplayStatus] = useState(false);
  let [balanceTokenA, setBalanceTokenA] = useState("");
  let [txFee, setTxFee] = useState("");
  let [userAllowanceAmount, setUserAllowanceAmount] = useState("");

  const getBalances = async () => {
    
    setDisplayStatus(!displayStatus);

    //if display status is false, we will save website from executing all code below
    if(displayStatus === false) {
      return;
    }

    //getting user address who calls this function
    let userAccount;
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        userAccount = accounts[0];
    } else {
        alert("Please install Metamask");
        return;
    }

            
    //checking userallowance
    let userAllowance = await contractTokenA.allowance(userAccount, AddressCoinfog);
    let userAllowance2 = userAllowance / (10**18);
    let userAllowance3 = userAllowance2.toString();

    //getting fee data
    let fee = await contractCoinFog.fee();
    let fee2 = fee / (10**18);
    let tokaBalance = await contractCoinFog.getContractTokenBalance();
    setBalanceTokenA(tokaBalance.toString())
    setTxFee(fee2.toString());
    setUserAllowanceAmount(userAllowance3);
  }

  return (
    <div>
      <button onClick={getBalances} className='button10'>GET BALANCES</button> <br />
      {
        displayStatus ?
        <>
          <strong><span>CoinFog TokenA Pool Balance:</span></strong> {balanceTokenA} TokenA<br />
          <strong>User Allowance:</strong> {userAllowanceAmount} TokenA <br />
          <strong>Deposit and Withdrawal Fee:</strong> {txFee} FTM <br /> <br />
        </>
        :
        <></>
      }
    </div>
  )
}

export default FogBalances;