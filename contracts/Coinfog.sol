//SPDX-License-Idettifier: MIT
//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CoinFog is Ownable {

    mapping(address => uint) public balances;
    mapping(address => bool) public isDeposited;

    uint public withdrawalLimit;
    uint public withdrawalFee; //as a percentage of withdrawal amount

    event Deposit(address indexed depositor, uint amount);
    event Withdrawal(address indexed withdrawer, uint amount, uint fee);


    constructor(uint limit, uint fee) {
        withdrawalLimit = limit;
        withdrawalFee = fee;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be bigger than 0");
        require(isDeposited[msg.sender] == false, "Already deposited");

        balances[msg.sender] += msg.value;
        isDeposited[msg.sender] = true;
        
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint _amount) external {
        require(_amount > 0, "invalid withdrawal amount");
        require(_amount <= balances[msg.sender], "insufficient balance");
        require(_amount <= withdrawalLimit, "exceeded withdrawal limit");

        uint fee = _amount * withdrawalFee / 100;
        uint withdrawalAmount = _amount - fee;
        balances[msg.sender] -= _amount;

        emit Withdrawal(msg.sender, withdrawalAmount, fee);
        
        //transferring withdrawalAmount from contract to msg.sender
        (bool success, ) = msg.sender.call{value: withdrawalAmount}("");
        require(success, "failed to send the amount");
    }
    
    function getBalance() external view returns(uint) {
        return balances[msg.sender];
    }

    function getContractBalance() external view returns(uint) {
        return address(this).balance;
    }

    function mixFunds() external onlyOwner {
        require(address(this).balance > 10000, "no funds to mix");//Randomly I chose 1000 to make the statement more meaningful
        uint mixedAmount = address(this).balance;
        
    }
    
    function mixFunds() external onlyOwner {
        require(address(this).balance > 0, "No funds available for mixing.");
        
        uint256 mixedAmount = address(this).balance;
        
        // Mixing logic - distribute mixedAmount among multiple addresses
        uint256 numAddresses = 5; // Number of addresses to distribute funds to
        uint256 amountPerAddress = mixedAmount / numAddresses;
        
        address[] memory addresses = generateAddresses(numAddresses); // Generate new addresses
        
        for (uint256 i = 0; i < numAddresses - 1; i++) {
            transferFunds(addresses[i], amountPerAddress); // Transfer funds to each address
        }
        
        // Remaining amount goes to the last address
        uint256 remainingAmount = mixedAmount - (amountPerAddress * (numAddresses - 1));
        transferFunds(addresses[numAddresses - 1], remainingAmount);
        
        emit Withdrawal(address(this), mixedAmount, 0);
    }
    
    function generateAddresses(uint256 numAddresses) private view returns (address[] memory) {
        address[] memory addresses = new address[](numAddresses);
        
        for (uint256 i = 0; i < numAddresses; i++) {
            // Generate a new address using your preferred method
            // Example: addresses[i] = generateNewAddress();
        }
        
        return addresses;
    }
    
    function transferFunds(address recipient, uint256 amount) private {
        // Transfer funds to the recipient address
        // Example: payable(recipient).transfer(amount);
    }
    
    function updateWithdrawalLimit(uint256 newLimit) external onlyOwner {
        withdrawalLimit = newLimit;
    }
    
    function updateWithdrawalFee(uint256 newFee) external onlyOwner {
        withdrawalFee = newFee;
    }
}