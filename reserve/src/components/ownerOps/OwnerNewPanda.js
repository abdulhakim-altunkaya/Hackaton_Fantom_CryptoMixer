import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressOwner } from "../addressABI/AddressOwner";

function OwnerNewPanda() {

    const { ethereum } = window;

    const contractPanda = useAccount(state => state.contractPanda2);

    let [newAddress, setNewAddress] = useState("");
    
    const transferOwnership = async () => {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
            alert("you are not owner");
            return;
        }
        if(newAddress.length < 20) {
            alert("Address is not correct");
            return;
        }  
        await contractPanda.transferOwner(newAddress);      
    }

    return (
        <div>
            <button onClick={transferOwnership} className='button4'>Change Owner Panda</button>
            <input type="text" className='inputFields' placeholder='new owner address'
            value={newAddress} onChange={ e => setNewAddress(e.target.value)} />
        </div>
    )
}

export default OwnerNewPanda;