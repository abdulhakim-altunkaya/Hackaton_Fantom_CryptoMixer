import React from 'react';
import FogBalances from "./FogBalances";
import FogApprove from "./FogApprove";
import FogHash from "./FogHash";
import FogDeposit from "./FogDeposit";
import FogWithdrawAll from "./FogWithdrawAll";
import FogWithdrawPart from "./FogWithdrawPart";

function Fog() {
  return (
    <div>
      <FogBalances />
      <FogApprove />
      <FogHash />
      <FogDeposit />
      <FogWithdrawAll />
      <FogWithdrawPart />
      <p id='aboutText'>Project created for Fantom Hackathon by Abdulhakim Altunkaya. 2023</p>
    </div>
  )
}

export default Fog;