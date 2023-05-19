





import {create } from "zustand";
import { ethers } from "ethers";
import { CONTRACT_ABI} from "./ContractABI";
import {CONTRACT_ADDRESS} from "./ContractAddress";

let signer;
let provider; 
let contract1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract1 = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

connectContract();

export const useAccount = create( () => (
    {
        contract: contract1
    }
))