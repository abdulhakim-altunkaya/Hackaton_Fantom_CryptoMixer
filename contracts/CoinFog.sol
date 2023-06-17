//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFog is Ownable {
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed receiver, uint amount);

    IERC20 tokenContract;

    function setToken(address tokenAddress) external {
        tokenContract = IERC20(tokenAddress);
    }

    //Each deposit will have a hash and an amount information
    mapping(bytes32 => uint) public balances;
    //Later each new hash will be saved in hash array
    bytes32[] public balanceIds;

    //there will be a fee for depositing and withdrawal to deter scammers
    uint public fee;
    mapping(address => bool) public feePayers;
    //security variable to pause contract
    bool public status;

    //Security logic: Contract pause
    error Stopped(string message, address owner);
    modifier isPaused() {
        if(status == true) {
            revert Stopped("contract has been paused, contact owner", owner());
        }
        _;
    }
    function togglePause() external onlyOwner {
        status = !status;
    }

    //Security logic: Checking if input hash already exists
    error Existing(string message, bytes32 hashdata);
    modifier isExisting(bytes32 _hash) {
        for(uint i=0; i<balanceIds.length; i++) {
            if(balanceIds[i] == _hash) {
                revert Existing("this hash exists", _hash);
            }
        }
        _;    
    }

    //Security logic: checking if msg.sender has paid function call fee
    error NotPaid(string message, address caller);
    modifier hasPaid() {
        if(feePayers[msg.sender] == false) {
            revert NotPaid("you need to pay withdrawal service fee", msg.sender);
        }
        _;
    }

    //fee setting, payment and collection logic 
    function setFee(uint _fee) external onlyOwner {
        fee = _fee;
    }
    function collectFees() external onlyOwner {
        uint contractFees = address(this).balance;
        require(contractFees > 1, "No significant fees collected yet");
        (bool success, ) = payable(owner()).call{value: contractFees}("");
        require(success == true, "fee collection failed");
    }
    function payFee() public payable {
        //4 ether which means 4 FTM is a reasonable fee for calling withdrawal function.
        //It will deter scam calls
        require(msg.value > 4 ether, "You need to pay withdrawal fee");
        feePayers[msg.sender] = true;
    }

    // ------------------------------------------------------------------------
    //                          DEPOSIT AND WITHDRAWAL FUNCTIONS
    // ------------------------------------------------------------------------

    //Function to deposit tokens into the contract
    //People must also pay for depositing into the contract which is 4 ftm
    //People must also approve contract before sending tokens to this contract
    function deposit(bytes32 _hash, uint _amount) external hasPaid isExisting(_hash) isPaused {

        //input validations
        require(_hash.length == 32, "invalid hash");
        require(_amount >= 1, "_amount must be bigger than 1");

        balanceIds.push(_hash);
        uint amount = _amount*(10**18);
        tokenContract.transferFrom(msg.sender, address(this), amount);
        balances[_hash] = amount;
    }


    function withdrawPart(string calldata _privateWord, bytes32 _newHash, address receiver, uint _amount) 
        external hasPaid isExisting(_newHash) isPaused
    {
        //input validations
        require(bytes(_privateWord).length > 0, "private word is not enough long");
        require(_newHash.length == 32, "invalid new hash");
        require(receiver != address(0), "invalid receiver address");
        require(bytes20(receiver) == bytes20(address(receiver)), "invalid receiver address");
        require(_amount > 0, "_amount must be bigger than 0");

        //withdrawing the desired amount
        feePayers[msg.sender] = false;
        uint amount = _amount * (10**18);
        (uint balanceFinal, bytes32 balanceHash) = getHashAmount(_privateWord);
        require(balanceFinal > amount, "If you want to withdraw all choose withdrawAll function");
        balances[balanceHash] = 0;
        tokenContract.transfer(receiver, amount);
        

        //redepositing the amount left
        uint amountLeft = balanceFinal - amount;
        require(amountLeft >= 1, "amountLeft must be bigger than 1");
        balanceIds.push(_newHash);
        balances[_newHash] = amountLeft;
    }

    function withdrawAll(string calldata _privateWord, address receiver) 
        external hasPaid isPaused
    {
        //input validations
        require(bytes(_privateWord).length > 0, "private word is not enough long");
        require(receiver != address(0), "invalid receiver address");
        require(bytes20(receiver) == bytes20(address(receiver)), "invalid receiver address");


        // Get the balance and hash associated with the private word
        (uint balanceFinal, bytes32 balanceHash) = getHashAmount(_privateWord);
        // Ensure the withdrawal amount is greater than 0
        require(balanceFinal > 0, "Withdraw amount must be bigger than 0");
        // Set the balance associated with the hash to 0
        balances[balanceHash] = 0;
        // Transfer the tokens to the receiver's address
        tokenContract.transfer(receiver, balanceFinal);
    }



    // HASH CREATION AND COMPARISON FUNCTIONS

    function createHash(string calldata _word) external pure returns(bytes32) {
        return keccak256(abi.encodePacked(_word));
    }
    function compareHash(string calldata inputValue) external view returns(bool) {
        bytes32 idHash = keccak256(abi.encodePacked(inputValue));
        for(uint i=0; i<balanceIds.length; i++) {
            if(balanceIds[i] == idHash) {
                return true;
            } 
        }
        return false;
    }
    
    function getHashAmount(string calldata inputValue) private returns(uint, bytes32) {
        require(msg.sender == address(this), "only this contract can call");
        bytes32 idHash = keccak256(abi.encodePacked(inputValue));
        // Resetting function call fee. Each fee is only for 1 function call
        feePayers[msg.sender] = false;

        for(uint i=0; i<balanceIds.length; i++) {
            if(balanceIds[i] == idHash) {
                return (balances[idHash], idHash);
            }
        }
        return (0, idHash);
    }

}



