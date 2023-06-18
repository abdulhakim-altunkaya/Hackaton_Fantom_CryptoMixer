const { expect } = require("chai");

describe("CoinFog", () => {
  let contractCoinFog;
  let contractTokenA;
  let owner;

  //I need these address later to send tokens between contract and accounts
  let addressCoinFog;
  let addressTokenA;
 
  beforeEach(async () => {

    //CoinFog block
    const CoinFog = await ethers.getContractFactory("CoinFog");
    contractCoinFog = await CoinFog.deploy();
    await contractCoinFog.deployed();
    //extra step for some functions
    addressCoinFog = contractCoinFog.address;
 
    //TokenA Block
    const TokenA = await ethers.getContractFactory("TokenA");
    contractTokenA = await TokenA.deploy(1000000); // Set the initial supply to 1000000
    await contractTokenA.deployed();

    //extra steps for some test blocks
    addressTokenA = contractTokenA.address;

    //getting owner for some test blocks
    [owner] = await ethers.getSigners();
  });

  it("Should deploy contract and print success message", async () => {
      console.log("Deployment is successful");
  });

  it("Should return the symbol of TokenA as TOKA", async () => {
      const tokenName = await contractTokenA.symbol();
      expect(tokenName).to.equal("TOKA");
  })

  it("Should return the owner of TokenA", async () => {
    let tokenAOwner = await contractTokenA.owner();
    expect(await contractTokenA.owner()).to.equal(owner.address);
    console.log(`TokenA Contract owner: ${tokenAOwner}`)
  })

  it("Should return the owner of CoinFog", async () => {
    let coinFogOwner = await contractCoinFog.owner();
    expect(await contractCoinFog.owner()).to.equal(owner.address);
    console.log(`CoinFog Contract owner: ${coinFogOwner}`);
  })

  it("Should mint 10000 tokenA", async () => {
    await contractTokenA.mintToken(10000)
    const tokenBalance = await contractTokenA.getYourBalance();
    //as it returns a string, I need to convert it to Number
    expect(Number(tokenBalance)).to.equal(10000);
    console.log(`TokenA Balance of msg.sender: ${tokenBalance}`);
  })

  it("Should set addresss of TokenA on CoinFog contract", async () => {
      await contractCoinFog.setToken(addressTokenA);
      let tokenAddress = await contractCoinFog.tokenContract();
      expect(addressTokenA).to.equal(tokenAddress);
      console.log(`TokenA Contract Address: ${tokenAddress}`);
  });

  it("Should pause and unpause CoinFog contract", async () => {
      await contractCoinFog.togglePause();
      let statusPause = await contractCoinFog.status();
      expect(statusPause).to.equal(true);
  });

  it("Should pay transaction fee", async () => {
      const valueToSend = ethers.utils.parseEther("5");
      await contractCoinFog.payFee({ value: valueToSend });
      let contractBalance = await contractCoinFog.getContractEtherBalance();
      expect(contractBalance).to.equal(5);
  });

  it("Should collect transaction fees", async () => {
      const valueToSend = ethers.utils.parseEther("5");
      await contractCoinFog.payFee({ value: valueToSend});
      await contractCoinFog.collectFees();
      let contractBalance = await contractCoinFog.getContractEtherBalance();
      expect(contractBalance).to.equal(0);
  });

  it("Should approve the CoinFog contract with 1000 tokens", async () => {
      await contractTokenA.mintToken(10000);
      await contractTokenA.approveCoinFog(addressCoinFog, 1000);
      const allowedamount = await contractTokenA.allowance(contractCoinFog.owner(), addressCoinFog);
      console.log(`CoinFog Contract has ${Number(allowedamount) / (10**18)} token allowance to spend`);
      expect(Number(allowedamount) / (10**18)).to.equal(1000);
  });

  it("Should deposit tokens into the Contract", async () => {
      //1.mint 10000 tokens and approve coinfog contract with 2000 tokens
      await contractTokenA.mintToken(10000);
      await contractTokenA.approveCoinFog(addressCoinFog, 2000);

      //2.send transaction fee to the coinfog contract
      const valueToSend = ethers.utils.parseEther("5");
      await contractCoinFog.payFee({ value: valueToSend });

      //3.Set the tokenA contract addresss
      await contractCoinFog.setToken(addressTokenA);

      //4.Depositing 50 tokens with the hash of "APPLE"
      await contractCoinFog.deposit("0xd57453a0104a6fc1d353ab99db06bab09479efa0154dcea90500636b5b7cb0df", 50)
  });

  it("Should Withdraw All", async () => {
      //depositing - details above
      await contractTokenA.mintToken(10000);
      await contractTokenA.approveCoinFog(addressCoinFog, 2000);
      const valueToSend = ethers.utils.parseEther("5");
      await contractCoinFog.payFee({value: valueToSend});
      await contractCoinFog.setToken(addressTokenA);
      await contractCoinFog.deposit("0xd57453a0104a6fc1d353ab99db06bab09479efa0154dcea90500636b5b7cb0df", 100);
      let contractBalance1 = await contractCoinFog.getContractTokenBalance();
      let depositorBalance1 = await contractTokenA.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266") / (10**18);
      console.log(`Contract Balance after deposit: ${contractBalance1.toString()}`);
      console.log(`Sender Balance after deposit: ${depositorBalance1.toString()}`);

      //withdrawing
      await contractCoinFog.withdrawAll("APPLE", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      let contractBalance2 = await contractCoinFog.getContractTokenBalance();
      let depositorBalance2 = await contractTokenA.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266") / (10**18);
      console.log(`Contract Balance after withdrawal: ${contractBalance2.toString()}`);
      console.log(`Sender Balance after withdrawal: ${depositorBalance2.toString()}`);
  })

});