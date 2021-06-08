// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract MyMotors {

    address public Manufacturer;
    address public Dealer;
    address private _owner;


    constructor() public{
        _owner = msg.sender;
    }

    function configure(address _Manufacturer, address _dealer) external {
         require(msg.sender == _owner, "MyMotors: Only Owner Can Configure...");
         Manufacturer = _Manufacturer;
         Dealer= _dealer;
     
    }

    function ManufactureCar() public {

      //   _mint(string carSym, string memory carname);


    }
    


    function _mint(string memory carname, string memory carSym) internal{
    

    }


}