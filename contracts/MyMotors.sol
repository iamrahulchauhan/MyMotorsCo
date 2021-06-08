// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";



contract MyMotors {

    address public Manufacturer;
    address public Dealer;
    address private _owner;


    Counters.Counter private _carIdTracker;

    constructor() public{
        _owner = msg.sender;
    }

    function configure(address _Manufacturer, address _dealer) external {
         require(msg.sender == _owner, "MyMotors: Only Owner Can Configure...");
         Manufacturer = _Manufacturer;
         Dealer= _dealer;
     
    }

    function ManufactureCar() public {

      //   _mint(msg.sender, carname, carSym);


    }
    


    function _mintCar(address creator,string memory carname, string memory carSym) internal returns (uint) {
        
        uint256 carId = _carIdTracker.current();

        _safeMint(creator, carId);
        _carIdTracker.increment();
        return (carId); 
    }


}