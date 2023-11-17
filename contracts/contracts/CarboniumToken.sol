// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarboniumToken is ERC20, Ownable {
    uint256 public s_maxSupply = 1000000000000000000;

    constructor() ERC20("CarboniumToken", "CT") Ownable() {
        // Mint some initial tokens to the contract owner
        _mint(address(this), s_maxSupply);
        _transfer(address(this), msg.sender, 1000000);
    }

    function faucet(address to, uint256 amount) external {
        _transfer(address(this), to, amount);
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
