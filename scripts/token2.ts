import { ethers } from "hardhat";

async function main() {
  const [addr] = await ethers.getSigners();

  const token2 = await ethers.deployContract("Token2", [addr.address]);

  await token2.waitForDeployment();

  console.log("Token deployed to", token2.target);
  //0x162Fa35064E961B608009EF636202979FD74415D
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
