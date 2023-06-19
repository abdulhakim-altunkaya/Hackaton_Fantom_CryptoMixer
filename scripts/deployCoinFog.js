
const hre = require("hardhat");

async function main() {

  const CoinFog = await hre.ethers.getContractFactory("CoinFog");
  const coinFog = await CoinFog.deploy();

  await coinFog.deployed();

  console.log(`coinFog  deployed to ${coinFog.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
