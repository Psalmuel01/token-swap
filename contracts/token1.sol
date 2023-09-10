//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token1 is ERC20 {
    constructor(address _addr) ERC20("Token1", "TK1") {
        _mint(_addr, 1_000e18);
    }

}

// uint ExpectedAmount = 50_000e18;

// function buyToken() external payable returns (uint) {
//     uint TokenValue = (1e18 / ExpectedAmount);
//     uint amount = (msg.value) * TokenValue;
//     _transfer(address(this), msg.sender, amount);
// }

// function returnBalance() external view returns (uint etherBal, tokenBal) {
//     etherBal = address(this).balance;
//     tokenBal = balanceOf(address(this));
// }

// function withdrawEther() external {
//     payable(msg.sender).transfer(address(this).balance);
// }
