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
    await contractTokenA.mintToken(20000);

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
      expect(await contractTokenA.owner()).to.equal(owner.address);
  })
});

