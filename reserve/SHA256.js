import React, {useState} from 'react';
import { SHA256 } from 'crypto-js';

function Main2() {
  let[word, setWord] = useState("");
  let[hashed, setHashed] = useState("");

  function internalHash(inputValue) {
    const output = SHA256(inputValue).toString();
    return output;
  }

  const hashInput = () => {
    let newHash = internalHash(word);
    setHashed(newHash);
  }

  return (
    <div>
      <button onClick={hashInput}>HASH THE WORD</button> <br />
      <input type="text" value={word} onChange={e => setWord(e.target.value)} />
      <p>Input: {word}</p>
      <p>Output: {hashed}</p>
    </div>
  )
}

export default Main2;