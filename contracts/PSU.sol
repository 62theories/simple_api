// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PSU is ERC20 {
    constructor() ERC20("PSUCOIN", "PSU") {
        _mint(msg.sender, 100 * 10**decimals());
    }
}
