
const hre = require("hardhat");

async function main() {


  const Coinfog = await hre.ethers.getContractFactory("Coinfog");
  const coinfog = await Coinfog.deploy();

  await coinfog.deployed();

  console.log(`coinfog  deployed to ${coinfog.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
