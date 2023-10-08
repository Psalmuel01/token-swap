//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token1 is ERC20 {
    constructor(address _addr) ERC20("Token1", "TK1") {
        _mint(_addr, 1_000e18);
    }
}
