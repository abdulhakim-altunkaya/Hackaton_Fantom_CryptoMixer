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
  })

});