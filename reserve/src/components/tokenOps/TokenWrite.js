import React from 'react'
import Wtoka from "./Wtoka";
import Wtoba from "./Wtoba";
import Owner from "../ownerOps/Owner";

function TokenWrite() {
  return (
    <div className='tokenWriteDiv'>
      <Wtoka />
      <Wtoba />
      <Owner />
    </div>
  )
}

export default TokenWrite