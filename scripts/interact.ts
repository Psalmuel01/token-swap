import { ethers, network } from "hardhat";

// NOTE:
// DO NOT RUN THE CODE ALL AT ONCE
// COMMENT ALL AND ONLY UNCOMMENT THE ONCE YOU NEED PER TIME

async function main() {
  // const ownerAddr = "0x9434E0a9878a1bE87918762a846dBEa7B333B5DE";
  // const owner = await ethers.getImpersonatedSigner(ownerAddr);
  const [owner] = await ethers.getSigners();

  // await network.provider.send("hardhat_setBalance", [
  //   ownerAddr,
  //   "0x91A76D5E7CC6F7DEE000"
  // ])

  // contract addresses
  const tokenA = "0xC908DfA6551e76641Fda4e82DeCF49751e7c7540";
  const tokenB = "0x162Fa35064E961B608009EF636202979FD74415D";
  const swap = "0x5620Ecce0fA7eBc7a70Fa421cE8d5A851130F075";

  const tokenAContract = await ethers.getContractAt("Token1", tokenA);
  const tokenBContract = await ethers.getContractAt("Token2", tokenB);
  const swapContract = await ethers.getContractAt("TokenSwap", swap);

  // checking balances before

  const tokenAbalance = ethers.formatEther(
    await tokenAContract.balanceOf(owner)
  );
  const tokenBbalance = ethers.formatEther(
    await tokenBContract.balanceOf(owner)
  );
  const contractAbalance = ethers.formatEther(
    await tokenAContract.balanceOf(swap)
  );
  const contractBbalance = ethers.formatEther(
    await tokenBContract.balanceOf(swap)
  );
  const reserveA = ethers.formatEther(await swapContract.reserveA());
  const reserveB = ethers.formatEther(await swapContract.reserveB());
  console.log({
    tokenAbalance: tokenAbalance,
    tokenBbalance: tokenBbalance,
    contractAbalance: contractAbalance,
    contractBbalance: contractBbalance,
    reserveA: reserveA,
    reserveB: reserveB,
  });

  // approving allowances

  const allowance = ethers.parseEther("50000000000000000");

  await tokenAContract.connect(owner).approve(swap, allowance);
  await tokenBContract.connect(owner).approve(swap, allowance);

  // adding liquidity

  const addTokenA = ethers.parseEther("200");
  const addTokenB = ethers.parseEther("500");

  const liquidity = await swapContract
    .connect(owner)
    .addLiquidity(addTokenA, addTokenB);
  await liquidity.wait();

  // withdrawing liquidity

  const removeTokenA = ethers.parseEther("100");
  const removeTokenB = ethers.parseEther("250");

  const withdraw = await swapContract
    .connect(owner)
    .withdrawLiquidity(removeTokenA, removeTokenB);
  await withdraw.wait();

  // swapping A to B and checking amount of B out

  const amountA = ethers.parseEther("10");

  const swapAtoB = await swapContract.connect(owner).swapAToB(amountA);
  await swapAtoB.wait();

  console.log({
    amountBOut: ethers.formatEther(
      await swapContract.connect(owner).getAmountOut(amountA)
    ),
  });

  // swapping B to A and checking amount of A in

  const amountB = ethers.parseEther("23");

  const swapBtoA = await swapContract.connect(owner).swapBToA(amountB);
  await swapBtoA.wait();

  console.log({
    amountAIn: ethers.formatEther(
      await swapContract.connect(owner).getAmountIn(amountB)
    ),
  });

  // checking balances after

  const tokenAbalance2 = ethers.formatEther(
    await tokenAContract.balanceOf(owner)
  );
  const tokenBbalance2 = ethers.formatEther(
    await tokenBContract.balanceOf(owner)
  );
  const contractAbalance2 = ethers.formatEther(
    await tokenAContract.balanceOf(swap)
  );
  const contractBbalance2 = ethers.formatEther(
    await tokenBContract.balanceOf(swap)
  );
  const reserveA2 = ethers.formatEther(await swapContract.reserveA());
  const reserveB2 = ethers.formatEther(await swapContract.reserveB());
  console.log({
    tokenAbalance: tokenAbalance2,
    tokenBbalance: tokenBbalance2,
    contractAbalance: contractAbalance2,
    contractBbalance: contractBbalance2,
    reserveA: reserveA2,
    reserveB: reserveB2,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
