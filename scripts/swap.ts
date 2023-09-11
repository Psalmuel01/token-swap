import { ethers } from "hardhat";

async function main() {
  const token1 = "0xC908DfA6551e76641Fda4e82DeCF49751e7c7540";
  const token2 = "0x162Fa35064E961B608009EF636202979FD74415D";

  const swap = await ethers.deployContract("TokenSwap", [token1, token2]);

  await swap.waitForDeployment();

  console.log("Swap deployed to", swap.target);
  //0xBBE383b1316f1aA99647F4eAffad92f0A9C64dAF
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
