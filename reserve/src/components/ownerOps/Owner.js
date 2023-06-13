import React, {useState} from 'react';
import OwnerMintA from "./OwnerMintA";
import OwnerMintB from "./OwnerMintB";
import OwnerPause from "./OwnerPause";
import OwnerSetAddress from "./OwnerSetAddress";
import OwnerUpdateFee from "./OwnerUpdateFee";
import OwnerRemoveA from "./OwnerRemoveA";
import OwnerRemoveB from "./OwnerRemoveB";
import OwnerLeftovers from "./OwnerLeftovers";
import OwnerNewPanda from './OwnerNewPanda';
import OwnerNewToba from './OwnerNewToba';
import OwnerNewToka from './OwnerNewToka';
import { AddressOwner } from "../addressABI/AddressOwner";


function Owner() {

    const { ethereum } = window;

    let [displayDetails, setDisplayDetails] = useState(false);

    const toggleDetails = async () => {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
            alert("you are not owner");
            setDisplayDetails(true);//This line I will delete when in production mode
            return;
        } else {
            setDisplayDetails(true); //this line I will delete when in production mode
            //setDisplayDetails(!displayDetails);
        }
      
    }

    return (
        <div>
            <button className='button9' id='btnRed' onClick={toggleDetails}>Owner Operations</button>
            {
                displayDetails === true ?
                <>
                    <OwnerMintA />
                    <OwnerMintB />
                    <OwnerPause />
                    <OwnerSetAddress />
                    <OwnerUpdateFee />
                    <OwnerRemoveA />
                    <OwnerRemoveB />
                    <OwnerLeftovers />
                    <OwnerNewPanda />
                    <OwnerNewToba />
                    <OwnerNewToka />
                </>
                :
                <></>
            }
        </div>
    )
}

export default Owner