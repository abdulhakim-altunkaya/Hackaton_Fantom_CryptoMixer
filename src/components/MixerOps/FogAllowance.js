import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressCoinfog } from "../AddressABI/AddressCoinfog";

function FogAllowance() {
    const {ethereum} = window;
    const contractTokenA = useAccount(state => state.contractTokenA2);

    let [message, setMessage] = useState("");

    const checkAllowance = async () => {

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
        setMessage(`Allowance is ${userAllowance3}`);
    }

    return (
        <div>
            <button className='button10' onClick={checkAllowance}>Check Allowance</button>&nbsp;&nbsp;{message}
        </div>
    )
}

export default FogAllowance