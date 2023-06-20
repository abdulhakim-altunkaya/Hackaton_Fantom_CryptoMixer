import React, {useState} from 'react';
import OwnerMintA from "./OwnerMintA";
import OwnerPause from "./OwnerPause";
import OwnerSetAddr from "./OwnerSetAddr";
import OwnerFee from "./OwnerFee";
import OwnerWithdraw from "./OwnerWithdraw";
import OwnerChangeA from "./OwnerChangeA";
import OwnerChangeCF from "./OwnerChangeCF";
import { AddressOwner } from "../AddressABI/AddressOwner";

function Owner() {
  return (
    <div>
      <OwnerMintA />
      <OwnerPause />
      <OwnerSetAddr />
      <OwnerFee />
      <OwnerWithdraw />
      <OwnerChangeA />
      <OwnerChangeCF />
    </div>
  )
}

export default Owner