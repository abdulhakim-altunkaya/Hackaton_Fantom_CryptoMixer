//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFog {
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed receiver, uint amount);

    IERC20 tokenContract;

    function setToken(address tokenAddress) external {
        tokenContract = IERC20(tokenAddress);
    }

    mapping(bytes32 => uint) public balances;
    bytes32[] public balanceIds;
    uint public fee;
    mapping(address => bool) public feePayers;

    error Existing(string message, bytes32 hashdata);
    modifier isExisting(bytes32 _hash) {
        for(uint i=0; i<balanceIds.length; i++) {
            if(balanceIds[i] == _hash) {
                revert Existing("this hash exists", _hash);
            }
        }
        _;    
    }

    error NotPaid(string message, address caller);
    modifier hasPaid() {
        if(feePayers[msg.sender] == false) {
            revert NotPaid("you need to pay withdrawal service fee");
        }
        _;
    }
    function setFee(uint _fee) external onlyOwner {
        fee = _fee;
    }
    function payFee() public payable {
        require(msg.value > 4 ether, "You need to pay fee");
    }




    function deposit(bytes32 _hash, uint _amount) external isExisting(_hash) {
        require(_amount >= 1, "_amount must be bigger than 1");
        balanceIds.push(_hash);
        balances[_hash] = _amount;
        tokenContract.transferFrom(msg.sender, address(this), _amount*(10**18));
    }

    function collectFee() public payable {
        //For Fantom blockchain, it makes sense to charge 5 ftm as FTM is around 1 usd
        require(msg.value > 4*(10**18), "You need to send at least 5 FTM");
    }

    function withdraw(string calldata _privateWord, bytes32 _newHash, address receiver, uint _amount) 
        external hasPaid isExisting(_newHash) {
        uint amount = _amount * (10**18);
        //As this function is important, we will charge a fee on everyone calling it.
        //Thus it will deter scammers and also can be seen as a fee collector.
        collectFee();
        tokenContract.transfer(receiver, amount);
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



