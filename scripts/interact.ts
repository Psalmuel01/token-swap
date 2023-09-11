import { ethers } from "hardhat";

async function main() {
  const ownerAddr = "0x9434E0a9878a1bE87918762a846dBEa7B333B5DE";

  //contract addresses
  const tokenA = "0xC908DfA6551e76641Fda4e82DeCF49751e7c7540";
  const tokenB = "0x162Fa35064E961B608009EF636202979FD74415D";
  const swap = "0xBBE383b1316f1aA99647F4eAffad92f0A9C64dAF";

  // const [owner] = await ethers.getSigners();
  const contractA = await ethers.getContractAt("Token1", tokenA);
  const contractB = await ethers.getContractAt("Token2", tokenB);
  const swapContract = await ethers.getContractAt("TokenSwap", swap);

  console.log({
    balanceA: ethers.formatEther(await contractA.balanceOf(ownerAddr)),
    balanceB: ethers.formatEther(await contractB.balanceOf(ownerAddr)),
  });

  const [owner] = await ethers.getSigners();
  const allowance = ethers.parseEther("50000000000");
  const addTokenA = ethers.parseEther("20");
  const addTokenB = ethers.parseEther("50");

  contractA.connect(owner).approve(swap, allowance);
  contractB.connect(owner).approve(swap, allowance);

  const allowA = await contractA.allowance(owner, swap);
  const allowB = await contractB.allowance(owner, swap);
  // console.log(allowA, allowB);

  const liquidity = await swapContract
    .connect(owner)
    .addLiquidity(addTokenA, addTokenB);
  // console.log(await liquidity.wait());

  const withdraw = await swapContract
    .connect(owner)
    .withdrawLiquidity(addTokenA, addTokenB);
  // console.log(withdraw);

  const swapAtoB = await swapContract.swapAToB(ethers.parseEther("2"));
  const swapBtoA = await swapContract.swapBToA(ethers.parseEther("5"));
  // console.log(swapAtoB);
  // console.log(swapBtoA);

  //trying to get balance after swap
  console.log({
    balanceA2: ethers.formatEther(await contractA.balanceOf(ownerAddr)),
    balanceB2: ethers.formatEther(await contractB.balanceOf(ownerAddr)),
  });

  console.log(ethers.formatEther(await swapContract.getAmountOut(ethers.parseEther("1"))));
  console.log(ethers.formatEther(await swapContract.getAmountIn(ethers.parseEther("2"))));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

