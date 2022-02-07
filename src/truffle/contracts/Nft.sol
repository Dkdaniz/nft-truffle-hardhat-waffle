// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC1155.sol";

contract Nft is ERC1155, Ownable {
    constructor() ERC1155("https://host/api/item/{id}.json") {}

    /**
     * @dev insert a new report.
     *
     * Requirements:
     *
     * - `hashDoc` cannot be the zero.
     */
    function mint(address to, uint256 tokenId, bytes memory hashDoc) onlyOwner public returns (bool) {
      bytes memory btsNull = new bytes(0);
      require(keccak256(btsNull) != keccak256(hashDoc), "ERC1155: hashDoc dont be the zero");
      require(hashDoc.length == 40, "ERC1155: hashDoc invalid");

      _mint(to, tokenId, 1, hashDoc);
      

      return true;
    }

    function hashDocLenght(bytes memory hashDoc) external pure returns (uint256){
      return hashDoc.length;
    }
}