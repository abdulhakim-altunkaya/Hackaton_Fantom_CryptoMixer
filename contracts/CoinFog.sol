//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CoinFog {
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed receiver, uint amount);

    IERC20 tokenContract;

    function setToken(address tokenAddress) external {
        tokenContract = IERC20(tokenAddress);
    }



    function withdraw(address payable receiver, uint amount) public {
        require(address(this).balance >= amount, "insufficient contract balance");
        (bool success, ) = receiver.call{value: amount}("");
        require(success, "transfer failed");
        emit Withdraw(receiver, amount);
    }
    
    function withdrawPart(string calldata _keyword, bytes32 _newHash, uint _amount) external {

    }



    mapping(bytes32 => uint) public balances;
    bytes32[] public balanceIds;

    error Existing(string message, bytes32 hashdata);
    modifier isExisting(bytes32 _hash) {
        for(uint i=0; i<balanceIds.length; i++) {
            if(balanceIds[i] == _hash) {
                revert Existing("this hash exists", _hash);
            }
        }
        _;    
    }

    function deposit(bytes32 _hash, uint _amount) external isExisting(_hash) {
        require(_amount >= 1, "_amount must be bigger than 1");
        balanceIds.push(_hash);
        balances[_hash] = _amount;
        tokenContract.transferFrom(msg.sender, address(this), _amount*(10**18));
    }

    function createHash(string memory _word) external pure returns(bytes32) {
        return keccak256(abi.encodePacked(_word));
    }

    function compareHash(string memory inputValue) external view returns(bool) {
        bytes32 idHash = keccak256(abi.encodePacked(inputValue));
        for(uint i=0; i<balanceIds.length; i++) {
            if(balanceIds[i] == idHash) {
                return true;
            } 
        }
        return false;
    }
}



