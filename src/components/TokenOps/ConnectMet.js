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
                    <span>Owner address:</span> 0x50b716662ca9717BA5DD7B20b5b722Cf15B0821B <br />   
                    <span>CoinFog address:</span> 0x088Dbb3123f3D44E8F11675FD851A847aeF670b0 <br />
                    <span>TokenA address:</span> 0xaeAC981BeD62872aD015EeB53d142bF16dB3CfE5 <br />
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

