// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";

contract EasCarbonium {
    using Counters for Counters.Counter;

     Counters.Counter public _attestationCounter; 

    struct AttestationData {
        string projectName;
        string country;
        string vintage;
        string standard;
        uint256 methodology;
        uint256 creditAmount;
        string issuerName;
        string issuerCountry;
    }

    struct Schema{
        address recipient;
        AttestationData data;
        address attester;
    }

    mapping(uint256 => Schema) public AttestationRegistry;

    event AttestationSucceeded(
        uint256 uid,
        address recipient,
        address attester
    );

    function attest(AttestationData memory inputParams, address _recipient)
        public
     returns(uint256 uid)
    {
        _attestationCounter.increment();
        uint256 _uid = _attestationCounter.current();
        AttestationRegistry[_uid] = Schema(_recipient, inputParams, msg.sender);

        emit AttestationSucceeded(_uid, _recipient, msg.sender);
        return _uid;
    }
}
