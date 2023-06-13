import React, {useState} from 'react'
import { useAccount } from '../../Store';
import { AddressOwner } from "../addressABI/AddressOwner";

function OwnerSetAddress() {

  const { ethereum } = window;

  const contractPanda = useAccount(state => state.contractPanda2);

  let [message, setMessage] = useState("");
  let [addressA, setAddressA] = useState("");
  let [addressB, setAddressB] = useState("");

  const setAddresses = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      setMessage("You are not owner");
      return;
    } else {
      if(addressA.length < 20 && addressB.length < 20) {
        alert("Address is not correct");
        return;
      } else {
        await contractPanda.setTokenAddresses(addressA, addressB);
        setMessage("Token Addresses are set");
      }
    }
  }

  return (
    <div>
        <button onClick={setAddresses} className='button4'>Set Addresses</button>
        <input type="text" className='inputFields' placeholder='address TokenA'
          value={addressA} onChange={ e => setAddressA(e.target.value)} />
        <input type="text" className='inputFields' placeholder='address TokenB'
          value={addressB} onChange={ e => setAddressB(e.target.value)} /> <br />
          {message}
    </div>
  )
}

export default OwnerSetAddress