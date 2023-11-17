// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {IEAS, AttestationRequest, AttestationRequestData} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {NO_EXPIRATION_TIME, EMPTY_UID} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";
import {CarbonCredits} from "./CarbonCredits.sol"; // Import your ERC1155 contract

contract Attestation {
    error InvalidEAS();

    // The address of the global EAS contract.
    IEAS private immutable _eas;
    CarbonCredits private _erc1155Contract; // Declare an instance of the ERC1155 interface

    constructor(IEAS eas, CarbonCredits erc1155Contract) {
        if (address(eas) == address(0) || address(erc1155Contract) == address(0)) {
            revert InvalidEAS();
        }

        _eas = eas;
        _erc1155Contract = erc1155Contract;
    }

    struct AttestationParams {
        string projectName;
        string country;
        string vintage;
        string standard;
        uint256 methodology;
        uint256 creditAmount;
        string issuerName;
        string issuerCountry;
    }

    event AttestMintSuccess(bytes32 attestationId, uint256 tokenId);

    function attestUint(
        bytes32 schema,
        AttestationParams memory inputs,
        address recptAddr
    ) external {
        bytes32 _attestationId = _eas.attest(
            AttestationRequest({
                schema: schema,
                data: AttestationRequestData({
                    recipient: recptAddr,
                    expirationTime: NO_EXPIRATION_TIME,
                    revocable: true,
                    refUID: EMPTY_UID,
                    data: abi.encode(
                        inputs.projectName,
                        inputs.country,
                        inputs.vintage,
                        inputs.standard,
                        inputs.methodology,
                        inputs.creditAmount,
                        inputs.issuerName,
                        inputs.issuerCountry
                    ),
                    value: 0
                })
            })
        );
        require(_attestationId.length > 0, "Attestation failed");
        // If attestation successful, call ERC1155 mint function
        _erc1155Contract.mint(recptAddr, inputs.methodology, inputs.creditAmount); // Adjust parameters accordingly
        emit AttestMintSuccess(_attestationId, inputs.methodology);
    }
}
