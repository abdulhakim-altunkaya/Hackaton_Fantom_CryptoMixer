import { create } from "zustand";
import { ethers } from "ethers";
import { ABITokenA } from "./components/addressABI/ABITokenA";
import { ABITokenB } from "./components/addressABI/ABITokenB";
import { ABIPanda } from "./components/addressABI/ABIPanda";
import { AddressTOKA } from "./components/addressABI/AddressTOKA";
import { AddressTOBA } from "./components/addressABI/AddressTOBA";
import { AddressPanda } from "./components/addressABI/AddressPanda";

let signer;
let provider;
let contractPanda1;
let contractTokenA1;
let contractTokenB1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contractPanda1 = new ethers.Contract(AddressPanda, ABIPanda, signer);
    contractTokenA1 = new ethers.Contract(AddressTOKA, ABITokenA, signer);
    contractTokenB1 = new ethers.Contract(AddressTOBA, ABITokenB, signer);
}

connectContract();

export const useAccount = create(() => ({
  contractPanda2: contractPanda1,
  contractTokenA2: contractTokenA1,
  contractTokenB2: contractTokenB1,
}));





