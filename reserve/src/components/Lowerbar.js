import React from 'react';
import { Route, Routes } from  "react-router-dom";
import LowToken from "./LowToken";
import LowSwap from "./LowSwap";

function Lowerbar() {
  return (
    <div className='lowerbarDiv'>
      <Routes>
          <Route path="/swap" element={ < LowSwap />} />
          <Route path="/" element={ <LowToken />} />
      </Routes>
    </div>
  )
}

export default Lowerbar