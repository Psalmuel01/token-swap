// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwap is Ownable {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint public reserveA;
    uint public reserveB;

    struct LiquidityProvider {
        uint amountA;
        uint amountB;
    }

    mapping(address => LiquidityProvider) liquidityProviders;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function getAmountOut(uint _amountA) public view returns (uint) {
        // b = B - (k / (A + a))
        uint k = reserveA * reserveB;
        return (reserveB - (k / (reserveA + _amountA)));
    }

    function getAmountIn(uint _amountB) public view returns (uint) {
        // a = A - (k / (B + b))
        uint k = reserveA * reserveB;
        return (reserveA - (k / (reserveB + _amountB)));
    }

    function swapAToB(uint amountA) external {
        uint amountB = getAmountOut(amountA);
        require(amountB > 0, "Insufficient output amount");
        require(
            tokenA.transferFrom(msg.sender, address(this), amountA),
            "Transfer of tokenA failed"
        );
        reserveA += amountA;
        reserveB -= amountB;
        LiquidityProvider storage provider = liquidityProviders[msg.sender];
        provider.amountA += amountA;
        provider.amountB -= amountB;
    }

    function swapBToA(uint amountB) external {
        uint amountA = getAmountIn(amountB);
        require(amountA > 0, "Insufficient input amount");
        require(
            tokenB.transferFrom(msg.sender, address(this), amountB),
            "Transfer of tokenB failed"
        );
        reserveA -= amountA;
        reserveB += amountB;
        LiquidityProvider storage provider = liquidityProviders[msg.sender];
        provider.amountA -= amountA;
        provider.amountB += amountB;
    }

    function addLiquidity(uint _amountA, uint _amountB) external {
        require(_amountA > 0, "Invalid amountA");
        require(_amountB > 0, "Invalid amountB");
        require(
            tokenA.transferFrom(msg.sender, address(this), _amountA),
            "Transfer of tokenA failed"
        );
        require(
            tokenB.transferFrom(msg.sender, address(this), _amountB),
            "Transfer of tokenB failed"
        );
        reserveA += _amountA;
        reserveB += _amountB;

        LiquidityProvider storage provider = liquidityProviders[msg.sender];
        provider.amountA += _amountA;
        provider.amountB += _amountB;
    }

    // if add, t b u;
    // if withdraw, u b t;
    function withdrawLiquidity(uint _amountA, uint _amountB) external {
        LiquidityProvider storage provider = liquidityProviders[msg.sender];
        require(provider.amountA > _amountA, "Insufficient balance of tokenA");
        require(provider.amountB > _amountB, "Insufficient balance of tokenB");

        reserveA -= _amountA;
        reserveB -= _amountB;
        provider.amountA -= _amountA;
        provider.amountB -= _amountB;

        require(
            tokenA.transfer(msg.sender, _amountA),
            "Withdrawal of tokenA failed"
        );
        require(
            tokenB.transfer(msg.sender, _amountB),
            "Withdrawal of tokenB failed"
        );
    }
}
