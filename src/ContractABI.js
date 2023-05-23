export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "changer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newNum",
        "type": "uint256"
      }
    ],
    "name": "NumChanged",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "changeNum",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "myNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]