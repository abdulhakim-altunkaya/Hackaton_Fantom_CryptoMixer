import React, {useState} from 'react';
import WtokaMint from "./WtokaMint";
import WtokaBurn from "./WtokaBurn";
import WtokaBal from "./WtokaBal";

function WTokenA() {

  let[displayStatus, setDisplayStatus] = useState(false);

  const displayParts = async () => {
    setDisplayStatus(!displayStatus);
  }

  return (
    <div>
        <button className='button9' onClick={displayParts}>TokenA Operations</button>
        { displayStatus === true ?
          <>
            <WtokaMint />
            <WtokaBurn />
            <WtokaBal />
          </>
        :
          <></>
        }

    </div>
  )
}

export default WTokenA