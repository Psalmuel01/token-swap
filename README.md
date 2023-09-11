# Web3bridge Test I

**Contract Address for Token1:** 0xC908DfA6551e76641Fda4e82DeCF49751e7c7540

**Contract Address for Token2:** 0x162Fa35064E961B608009EF636202979FD74415D

# TokenSwap Smart Contract

## Table of Contents

- [Overview](#contract-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contract Functions](#contract-functions)
- [Verified Contracts](#verified-contracts)

---

## Overview

This repository contains the source code for the TokenSwap smart contract, a decentralized exchange (DEX) that allows users to swap tokens using the Constant Product Market Maker (CPMM) formula. This README provides an overview of the contract, its functions, and how to interact with it.

## Features

The TokenSwap contract includes the following features:

1. **Token Swapping:** Users can swap tokenA for tokenB and vice versa using the CPMM formula to calculate exchange rates.

2. **Liquidity Provision:** Liquidity providers can add both tokenA and tokenB to the pool to facilitate trading.

3. **Liquidity Withdrawal:** Liquidity providers can withdraw their liquidity from the pool.

## Getting Started

To get started with TokenSwap, follow these steps:

1. **Compile the Contract:** Use a Solidity compiler (e.g., Solidity, Hardhat, Truffle) to compile the TokenSwap.sol file.

2. **Deploy the Contract:** Deploy the compiled contract to the Ethereum network (mainnet or a testnet). Ensure that you provide valid addresses for tokenA and tokenB as constructor arguments.

3. **Interact with the Contract:** Users and liquidity providers can interact with the contract functions using Ethereum wallets or dApps. Ensure that you have the contract address to interact with it.

## Contract Functions

### `getAmountOut(uint _amountA)`

- **Description:** Calculates the expected amount of tokenB to receive when swapping \_amountA of tokenA.
- **Input:** `_amountA` - The amount of tokenA to swap.
- **Output:** The expected amount of tokenB.

### `getAmountIn(uint _amountB)`

- **Description:** Calculates the expected amount of tokenA required to receive \_amountB of tokenB.
- **Input:** `_amountB` - The amount of tokenB to receive.
- **Output:** The required amount of tokenA.

### `swapAToB(uint amountA)`

- **Description:** Allows users to swap tokenA for tokenB.
- **Input:** `amountA` - The amount of tokenA to swap.
- **Requirements:** Sufficient allowance for tokenA, and tokenA balance must cover the swap.

### `swapBToA(uint amountB)`

- **Description:** Allows users to swap tokenB for tokenA.
- **Input:** `amountB` - The amount of tokenB to swap.
- **Requirements:** Sufficient allowance for tokenB, and tokenB balance must cover the swap.

### `addLiquidity(uint _amountA, uint _amountB)`

- **Description:** Allows liquidity providers to add both tokenA and tokenB to the liquidity pool.
- **Inputs:** `_amountA` - The amount of tokenA to add, `_amountB` - The amount of tokenB to add.
- **Requirements:** Sufficient allowances for both tokens, and token balances must cover the provided amounts.

### `withdrawLiquidity(uint _amountA, uint _amountB)`

- **Description:** Allows liquidity providers to withdraw their liquidity from the pool.
- **Inputs:** `_amountA` - The amount of tokenA to withdraw, `_amountB` - The amount of tokenB to withdraw.
- **Requirements:** Liquidity provider must have sufficient balances of both tokens in the pool.

---

## Verified Contracts

- [Swap contract address](https://sepolia.etherscan.io/address/0x7cBc92c9eB3848AD97ae8357D6A95DB0fc89925A#code)
- [Token1 contract address](https://sepolia.etherscan.io/address/0xC908DfA6551e76641Fda4e82DeCF49751e7c7540#code)
- [Token2 contract address](https://sepolia.etherscan.io/address/0x162Fa35064E961B608009EF636202979FD74415D#code)
