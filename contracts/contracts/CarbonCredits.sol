// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCredits is ERC1155, Ownable {
    constructor() ERC1155("CarbonCredits") Ownable() {
        _mint(msg.sender, 1, 10, "");
        _mint(msg.sender, 2, 50, "");
        _mint(msg.sender, 3, 100, "");
    }

    function mint(address account, uint256 id, uint256 amount) external {
        _mint(account, id, amount, "");
    }

    function burn(address account, uint256 id, uint256 amount) external onlyOwner {
        _burn(account, id, amount);
    }
}
