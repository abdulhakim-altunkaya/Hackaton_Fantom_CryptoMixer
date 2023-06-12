//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

contract CoinFog {
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed receiver, uint amount);

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(address payable receiver, uint amount) public {
        require(address(this).balance >= amount, "insufficient contract balance");
        (bool success, ) = receiver.call{value: amount}("");
        require(success, "transfer failed");
        emit Withdraw(receiver, amount);
    }

    mapping(bytes32 => uint) public balances;
    bytes32[] public balanceIds;

    function addMapping(bytes32 input1, uint input2) external {
        balances[input1] = input2;
        balanceIds.push(input1);
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



