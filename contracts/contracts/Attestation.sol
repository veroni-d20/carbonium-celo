// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {EasCarbonium} from "./EasCarbonium.sol";
import {CarbonCredits} from "./CarbonCredits.sol"; // Import your ERC1155 contract

contract Attestation {
    // The address of the global EAS contract.
    EasCarbonium private immutable _eas;
    CarbonCredits private _erc1155Contract; // Declare an instance of the ERC1155 interface

    constructor(EasCarbonium eas, CarbonCredits erc1155Contract) {
        require(address(eas) != address(0) || address(erc1155Contract) != address(0), "Invalid Address");
        _eas = eas;
        _erc1155Contract = erc1155Contract;
    }

    event AttestMintSuccess(uint256 attestationId, uint256 tokenId);

    function attestUint(
        EasCarbonium.AttestationData memory inputs,
        address recptAddr
    ) external {
        uint256 _attestationId = _eas.attest(inputs, recptAddr);
        require(_attestationId > 0, "Attestation failed");
        // If attestation successful, call ERC1155 mint function
        _erc1155Contract.mint(recptAddr, inputs.methodology, inputs.creditAmount); // Adjust parameters accordingly
        emit AttestMintSuccess(_attestationId, inputs.methodology);
    }
}
