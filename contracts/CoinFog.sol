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
}



