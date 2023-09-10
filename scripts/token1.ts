import { ethers } from "hardhat";

async function main() {
  const [address] = await ethers.getSigners();

  const token1 = await ethers.deployContract("Token1", [address.address]);

  await token1.waitForDeployment();

  console.log("Token deployed to", token1.target);
  //0xC908DfA6551e76641Fda4e82DeCF49751e7c7540
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
