import React, {useState} from 'react';

function ConnectMet() {

    const {ethereum} = window;

    let [displayStatus, setDisplayStatus] = useState(false);
    let [account, setAccount] = useState("");

    const connectMetamask = async () => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            setAccount(accounts[0]);
            setDisplayStatus(!displayStatus);
        } else {
            alert("You need to install Metamask");
            return;
        }
    }


    return (

        <div>
            <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
            {
                displayStatus === true ? 
                <>
                <div className='contractDetailsDiv'>
                    <span>Your Metamask Account:</span>  <br />{account} <br /> 
                    <span>Owner address:</span> 0x0FFeAf1dd1B54606CdD816B97BaCF51936E3d35a <br />   
                    <span>CoinFog address:</span> 0x25ff1Ba107cE37F289Fe421F18284e5841370fB6 <br />
                    <span>TokenA address:</span> 0xC65f8b1C0F135d422ea5850aEC33A2222cFCF247 <br />
                    <span>TokenA symbol & Cap:</span>  TOKA, 1000000 <br />
                    <span>TokenA Standard & Decimals:</span>  ERC20, 18 <br />
                    <span>Network:</span> Fantom Testnet <br />
                </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default ConnectMet;

