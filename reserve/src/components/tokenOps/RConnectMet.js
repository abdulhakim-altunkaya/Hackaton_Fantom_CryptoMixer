import React, { useState } from 'react'

function RConnectMet() {
  const { ethereum } = window;
  let[displayStatus, setDisplayStatus] = useState(false);
 
  let [account, setAccount] = useState("");
  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setDisplayStatus(true)
    } else {
      alert("install Metamask on your browser");
      return;
    }
  }
 
  const hideDetails = () => {
    setDisplayStatus(false);
  } 

  return (
    <>
      <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
      { displayStatus === true ?
        <>
          <div className='contractDetailsDiv'>
              <span>Your Metamask Account:</span>  <br />{account} <br /> 
              <span>TokenA address:</span> 0xC65f8b1C0F135d422ea5850aEC33A2222cFCF247 <br />
              <span>TokenA symbol:</span>  TOKA <br />
              <span>TokenA cap: </span>  1000000 <br />
              <span>TokenB address:</span> 0xDf7AF8217169e8C65A0a40124B10e13A885cc449 <br />
              <span>TokenB symbol:</span>  TOBA <br />
              <span>TokenB cap: </span>  1000000 <br />
              <span>Token Standard:</span>  ERC20 <br />
              <span>Token Decimals:</span>  18 <br />
              <span>Network:</span> Binance Smart Chain Testnet <br />
              <span>PandaSwap address:</span> 0x25ff1Ba107cE37F289Fe421F18284e5841370fB6 <br />
              <span>Owner address:</span> 0x0FFeAf1dd1B54606CdD816B97BaCF51936E3d35a <br />   
          </div>
          <button className='hidingButton' onClick={hideDetails}>Hide Details</button>
        </>
      :
        <></>
      }
      
    </>

  )
}

export default RConnectMet