// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PoshDevNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("PoshDevNFT", "PDN") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    // ✅ Removed `onlyOwner` so anyone can mint for testing
    function mint(string memory tokenURI) public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId); // ✅ sender becomes the owner
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;
        return newTokenId;
    }
}
