// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwap is Ownable {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint public reserveA;
    uint public reserveB;

    uint public constant k = 2e6;

    struct LiquidityProvider {
        uint amountA;
        uint amountB;
    }

    mapping(address => LiquidityProvider) liquidityProvider;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function getAmountOut(uint _amountA) public view returns (uint) {
        // b = B - (k / (A + a))
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        return (provider.amountB - (k / (provider.amountA + _amountA)));
    }

    function getAmountIn(uint _amountB) public view returns (uint) {
        // a = A - (k / (B + b))
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        return (provider.amountA - (k / (provider.amountB + _amountB)));
    }

    function swapAToB(uint amountA) external {
        uint amountB = getAmountOut(amountA);
        require(amountB > 0, "Insufficient output amount");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA += amountA;
        provider.amountB -= amountB;
    }

    function swapBToA(uint amountB) external {
        uint amountA = getAmountIn(amountB);
        require(amountA > 0, "Insufficient input amount");
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA -= amountA;
        provider.amountB += amountB;
    }

    function addLiquidity(uint _amountA, uint _amountB) external {
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        reserveA += _amountA;
        reserveB += _amountB;

        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA += _amountA;
        provider.amountB += _amountB;
    }

    function withdrawLiquidity(uint _amountA, uint _amountB) {
        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        uint balA = provider.amountA;
        uint balB = provider.amountB;
        require(balA > _amountA, "Insufficient balance of tokenA");
        require(balB > _amountB, "Insufficient balance of tokenA");
        provider.amountA -= _amountA;
        provider.amountB -= _amountB;
    }
}
