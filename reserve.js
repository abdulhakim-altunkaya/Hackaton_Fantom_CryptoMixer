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


  it("Should add liquidity in PandaSwap contract", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    // Approve the PandaSwap contract to receive the tokens
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    // Add liquidity
    await contractPandaSwap.addLiquidity(2, 2);
    const tokenABalance = await contractTokenA.balanceOf(addressPandaSwap);
    expect(tokenABalance).to.equal(ethers.utils.parseEther("2"));
  })

  it("Should remove liquidity in PandaSwap contract", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    // Approve the PandaSwap contract to receive the tokens
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    // Add liquidity
    await contractPandaSwap.addLiquidity(2, 2);
    await contractPandaSwap.removeLiquidityTokenB(1);
    const tokenBBalance = await contractTokenB.balanceOf(addressPandaSwap);
    let expectedBalance = 1*(10**18); //instead of ethers.utils.parseEther("1")
    expect(tokenBBalance.toString()).to.equal(expectedBalance.toString()); //As number is very big, I need to convert it to string
  })

  it("Should swap 100 tokenA to tokenB", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    // Approve the PandaSwap contract to receive the tokens
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("1000"));
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("600"));
    // Add liquidity
    await contractPandaSwap.addLiquidity(1000, 600);

    //grabbing tokenB balance of the Pandaswap contract for expect statement
    let tokenBBalance = await contractTokenB.balanceOf(addressPandaSwap);

    //approve PandaSwap contract to receive TokenA amount before swapping
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("100"));
    //after approving TokenA amount, now we can swap it to TokenB amount.
    //100 is the amount of TokenA we want to swap and 5 is min TokenA amount.
    await contractPandaSwap.swapAwithB(100, 5);

    let expectedBalance = await contractTokenB.balanceOf(addressPandaSwap);
    expect(Number(expectedBalance)).to.be.lessThan(Number(tokenBBalance));
  });

  it("Should withdraw leftover tokens", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    //approve PandaSwap contract to receive tokens
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("500"));
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("1000"));
    //add liquidity
    await contractPandaSwap.addLiquidity(500, 1000);

    //approve PandaSwap contract for receive TokenA amount from user before swapping
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("300"));
    //after approving TokenA amount, now we can swap it to TokenB amount.
    //900 is the amount of TokenA we want to swap and 5 is min TokenA amount.
    await contractPandaSwap.swapBwithA(300, 5);

    //The use will get 150 tokenA for 300 tokenB. The contract will charge 0.15 tokenA for 
    //this operation. Which means If I call leftover function, it should succeed.
    const amountBamount = await contractPandaSwap.getTokenABalance();
    const reserveBamount = await contractPandaSwap.reserveA();
    //before withdrawal
    console.log("A general balance is:", amountBamount);
    console.log("A reserve Balance is:", reserveBamount);
    await contractPandaSwap.withdrawLeftoverTokens();
    const amountBamount2 = await contractPandaSwap.getTokenABalance();
    const reserveBamount2 = await contractPandaSwap.reserveA();
    //after withdrawal
    console.log("A general balance is:", amountBamount2);
    console.log("A reserve Balance is:", reserveBamount2);
    expect(amountBamount2.toString()).to.equal(reserveBamount2.toString());
  })
});

 