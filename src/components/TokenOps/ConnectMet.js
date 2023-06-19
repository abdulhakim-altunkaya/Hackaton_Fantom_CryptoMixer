import React, {useState} from 'react';

function ConnectMet() {

    const {ethereum} = window;

    let [account, setAccount] = useState("");

    const connectMetamask = async () => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            setAccount(accounts[0]);
        }
    }
    return (

        <div>
            <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
            <p>{account}</p>
        </div>
    )
}

export default ConnectMet;

