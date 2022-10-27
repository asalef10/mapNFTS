
// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTmaps is ERC721{ 

     address public owner;
     locationDetails[] availableCountries;
     mapping(uint => locationDetails) public allLocationData;
     mapping(address => mapping(uint=>bool)) public buyer;
     mapping(uint => bool) locationIsCath;
     uint public numCountries;
     string[] arrayLocations;
     uint[] public arrayId ;
    uint256 public tokenID;


 
 struct locationDetails{
     uint id;
     string Type;
     bool isRenter;
     string nameCuntry;
     string[] arrayLocations;
     address buyerLocation;
}
 
    constructor() ERC721("mapsNFT", "mNFT")  {
     owner = msg.sender;      
}

function locationId(uint num)public view returns(uint)  {
return arrayId[num];
}

function buyLocations(uint num )public payable{
    require(locationIsCath[num] == false,"The location is occupied");
    locationDetails storage buyLoction = allLocationData[num];
    buyer[msg.sender][num] = true; 
    buyLoction.isRenter = true;
    buyLoction.buyerLocation = msg.sender;
    locationIsCath[num] = true;

}



function releaseLocation(uint num) public  {
    require(buyer[msg.sender][num] == true,"You do not have this location");
    locationDetails storage releaselocation = allLocationData[num]; 
        releaselocation.isRenter = false;
        releaselocation.buyerLocation = address(0);
        locationIsCath[num] = false;
        buyer[msg.sender][num] = false;


} 
function isBuyer(uint num) public view returns(bool){
return buyer[msg.sender][num];
}

function listMaps(uint numberLocation)public view returns(locationDetails memory){
return allLocationData[numberLocation];
}

 function createCountries(string memory Type ,string memory nameCuntry, string memory location,bool isRenterBool)public {
            locationDetails storage newCountries = allLocationData[numCountries]; 
             numCountries++;
            newCountries.Type = Type;
            newCountries.id = numCountries - 1;
            newCountries.nameCuntry = nameCuntry;
            newCountries.arrayLocations.push(location);
            newCountries.isRenter = isRenterBool;

}

 function createNFT(string memory nftURI) public payable returns (uint256) {
        uint256 newTokenId = tokenID;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, nftURI);
        setApprovalForAll(address(this), true);
        tokenID = tokenID + 1;
        return newTokenId;
    }

}
