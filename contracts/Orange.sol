//SPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

contract Orange {
    uint public myNumber = 88;

    event NumChanged(address changer, uint newNum);

    function changeNum() external {
        myNumber = myNumber + 9;
        emit NumChanged(msg.sender, myNumber);
    }
}