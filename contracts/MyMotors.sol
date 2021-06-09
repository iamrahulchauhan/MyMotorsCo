// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {
    ReentrancyGuard
} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";




contract MyMotors is ERC721, ReentrancyGuard{
    using Counters for Counters.Counter;

    address payable Manufacturer;
    address payable Dealer;
    address private _owner;

    enum STATE {
        CREATED,READY_FOR_SALE,SOLD
    }
    STATE state;

    mapping (uint256 => uint256) private _carPrice;


    Counters.Counter  _carIdTracker;

    constructor() ERC721("MyMotor","MYM") {
        _owner = msg.sender;
    }

    function configure(address payable _Manufacturer, address payable _dealer) external nonReentrant{
         require(msg.sender == _owner, "MyMotors: Only Owner Can Configure...");
         Manufacturer = _Manufacturer;
         Dealer= _dealer;
     
    }

    function ManufactureCar() public nonReentrant {
        require(msg.sender == Manufacturer, "MyMotors: Only Owner Can Create a Car...");
      _mintCar(msg.sender);

    }
    


    function _mintCar(address creator) internal returns (string memory, uint, string memory, STATE) {
        
        uint256 carId = _carIdTracker.current();
        _safeMint(creator, carId);
        _carIdTracker.increment();
        state = STATE.CREATED;
        return ("carId",carId,"status",state); 
    }

    function Approve(uint256 carId) public {
        //require manufacture to approve dealer to sell
        require(msg.sender == Manufacturer);
        approve(Dealer, carId);
    }

    function sellCar(uint256 carId, uint256 price) public nonReentrant returns (string memory, uint, string memory, STATE) {
        require(msg.sender == Dealer);
        require(_exists(carId), "ERC721Metadata: URI set of nonexistent token");
        _carPrice[carId] = price;
        state = STATE.READY_FOR_SALE;
        return ("carId",carId,"status",state);
    }

    function buyCar(uint256 carId, uint256 amount) public payable nonReentrant returns (string memory, uint, string memory, STATE) {
        require(msg.sender != Manufacturer,"Manufacturer Cant Purchase");
        require(msg.sender != Dealer,"Dealer already Owns the car");
        require(ownerOf(carId)== Dealer);
        require(amount == _carPrice[carId],"Amount Do Not Match With The Set Price Of Car");
        Dealer.transfer(amount);
        safeTransferFrom(Dealer, msg.sender, carId);
        state = STATE.SOLD;
        return ("carId",carId,"status",state);     
    }
    function getOwner(uint256 carId) public view returns(address) {
        address Owner = ownerOf(carId);
        return (Owner);
    }



}