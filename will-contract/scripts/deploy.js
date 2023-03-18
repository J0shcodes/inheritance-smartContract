const { ethers } = require("hardhat");

async function main() {
  const willContract = await ethers.getContractFactory("Will");

  const deployedWillContract = await willContract.deploy();

  await deployedWillContract.deployed();

  console.log("Will Contract Address:", deployedWillContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
