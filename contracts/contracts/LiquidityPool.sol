// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityPool is IERC1155Receiver, ERC1155Holder, Ownable {
    using SafeMath for uint256;

    IERC1155 public erc1155Token;
    IERC20 public erc20Token;

    event Deposit(address indexed account, uint256 tokenId, uint256 amount);
    event Withdrawal(address indexed account, uint256 tokenId, uint256 amount);
    event SwapERC20ForERC1155(
        address indexed user,
        uint256 erc20Amount,
        uint256 tokenId,
        uint256 erc1155Amount
    );
    event SwapERC1155ForERC20(
        address indexed user,
        uint256 tokenId,
        uint256 erc1155Amount,
        uint256 erc20Amount
    );

    constructor(address _erc1155Token, address _erc20Token) {
        erc1155Token = IERC1155(_erc1155Token);
        erc20Token = IERC20(_erc20Token);
    }

    function swapERC20ForERC1155(uint256 erc20Amount, uint256 tokenId) external {
        require(erc20Amount > 0, "Invalid ERC20 amount");

        uint256 erc1155Amount = getQuoteERC20ToERC1155(erc20Amount, tokenId);

        erc20Token.transferFrom(msg.sender, address(this), erc20Amount);
        erc1155Token.safeTransferFrom(msg.sender, address(this), tokenId, erc1155Amount, "");
        emit Deposit(msg.sender, tokenId, erc1155Amount);
        emit SwapERC20ForERC1155(msg.sender, erc20Amount, tokenId, erc1155Amount);
    }

    function swapERC1155ForERC20(uint256 tokenId, uint256 erc1155Amount) external {
        require(erc1155Amount > 0, "Invalid ERC1155 amount");

        uint256 erc20Amount = getQuoteERC1155ToERC20(erc1155Amount, tokenId);

        erc1155Token.safeTransferFrom(msg.sender, address(this), tokenId, erc1155Amount, "");
        erc20Token.transfer(msg.sender, erc20Amount);
        emit Withdrawal(msg.sender, tokenId, erc1155Amount);
        emit SwapERC1155ForERC20(msg.sender, tokenId, erc1155Amount, erc20Amount);
    }

    function getQuoteERC20ToERC1155(
        uint256 erc20Amount,
        uint256 tokenId
    ) public view returns (uint256 erc1155Amount) {
        require(erc20Amount > 0, "Invalid ERC20 amount");

        uint256 tokenBalance = erc20Token.balanceOf(address(this));
        uint256 erc1155Reserve = erc1155Token.balanceOf(address(this), tokenId);

        erc1155Amount = erc20Amount.mul(erc1155Reserve).div(tokenBalance);

        return erc1155Amount;
    }

    function getQuoteERC1155ToERC20(
        uint256 erc1155Amount,
        uint256 tokenId
    ) public view returns (uint256 erc20Amount) {
        require(erc1155Amount > 0, "Invalid ERC1155 amount");

        uint256 tokenBalance = erc20Token.balanceOf(address(this));
        uint256 erc1155Reserve = erc1155Token.balanceOf(address(this), tokenId);

        erc20Amount = erc1155Amount.mul(tokenBalance).div(erc1155Reserve);

        return erc20Amount;
    }
}
