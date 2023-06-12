import React, { useState } from 'react';
import { ethers } from 'ethers';

function internalHash(inputValue) {
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(inputValue));
  return hash;
}

function App() {
  const [word, setWord] = useState('');
  const [hashed, setHashed] = useState('');

  const hashInput = () => {
    const newHash = internalHash(word);
    setHashed(newHash);
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={hashInput}>Hash</button>
      <p>Original word: {word}</p>
      <p>Hashed word: {hashed}</p>
    </div>
  );
}

export default App;
