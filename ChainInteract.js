const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./build/contracts/MyMotors.json');
const C_address = '0xdfA001b4470CD9B5bf6147c6D57f618e797d147C';
const privateKey = 'Your Mnemonics Here';
const infuraUrl = 'https://rinkeby.infura.io/v3/8952eb9e68664ae9854073b73f5cd02e'; 
const provider = new Provider(privateKey, infuraUrl); 
const web3 = new Web3(provider);
const MyMotors = new web3.eth.Contract( MyContract.abi, C_address );
const Owner ="0xD4f6Cb0C1Fe07407b7098ac7Fe4265f3B2AE61f2"
const Manufacturer ="0xF81A19C17dd2258A763db55BA6Ca3e03e955aFA8"
const Dealer ="0x4c2B602d163697a8458363051095f9942944Cb1f"
const Customer="0xd30A7aeD0b774c9ab87E64b3ddAF93890122f42b"


//write functions from Media Contract 
const Configure = async () => {
    console.log("Configuring the Contract")
    const receipt = await MyMotors.methods.configure(Manfacturer,Dealer).send({ from: Owner });
    console.log('Waiting for Transaction Hash...')
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

const Manufacture = async () => {
    console.log("Manufacturing Car")
    const receipt = await MyMotors.methods.ManufactureCar().send({ from: Manufacturer });
    console.log('Waiting for Transaction Hash...')
    console.log(receipt);
    console.log(receipt.carId);
}

const approve = async () => {
    console.log("Approving Dealer To Sell")
    const carId = '0'
    const receipt = await MyMotors.methods.Approve(carId).send({ from: Manufacturer });
    console.log('Waiting for Transaction Hash...')
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

const SellCar = async () => {
    console.log("Listing Car For Sell")
    const carId = '0'
    const Price = '2'
    const receipt = await MyMotors.methods.sellCar(carId,Price).send({ from: Dealer });
    console.log('Waiting for Transaction Hash...')
    console.log(receipt);
}

const BuyCar = async () => {
    console.log("Purchasing Car")
    const carId = '0'
    const Amount = '2'
    const receipt = await MyMotors.methods.buyCar(carId,Amount).send({ from: Customer });
    console.log('Waiting for Transaction Hash...')
    console.log(receipt);
}

const GetOwner = async () => {
    console.log("Fetching the Owner")
    const carId = '0'
    const receipt = await MyMotors.methods.getOwner(carId).call({ from: Owner});
    console.log('Waiting for Transaction')
    console.log(receipt);
}

//Configure();
Manufacture();
//approve();
//SellCar();
//BuyCar();
//GetOwner();
