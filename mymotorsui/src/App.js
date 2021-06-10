import './App.css';
import carLogo from './carLogo.png'
import { useState } from "react";
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./contracts/MyMotors.json');
const C_address = '0xdfA001b4470CD9B5bf6147c6D57f618e797d147C';
const privateKey = 'mechanic fantasy economy improve jacket tuna kiss present pet prepare certain segment';
const infuraUrl = 'https://rinkeby.infura.io/v3/8952eb9e68664ae9854073b73f5cd02e'; 
const provider = new Provider(privateKey, infuraUrl); 
const web3 = new Web3(provider);
const MyMotors = new web3.eth.Contract( MyContract.abi, C_address );
const Owner ="0xD4f6Cb0C1Fe07407b7098ac7Fe4265f3B2AE61f2"
const Manufacturer ="0xF81A19C17dd2258A763db55BA6Ca3e03e955aFA8"
const Dealer ="0x4c2B602d163697a8458363051095f9942944Cb1f"
const Customer="0xd30A7aeD0b774c9ab87E64b3ddAF93890122f42b"
 

function App() {
 
  const [txnReceipt,setReceipt]=useState({
    Receipt:"" 
    
  })

  

const Configure = async () => {
  console.log("Configuring the Contract")
  const receipt = await MyMotors.methods.configure(Manufacturer,Dealer).send({ from: Owner });
  console.log('Waiting for Transaction Hash...')
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  setReceipt({
    Receipt:(receipt.transactionHash)
  })
}

const Manufacture = async () => {
  console.log("Manufacturing Car")
  const receipt = await MyMotors.methods.ManufactureCar().send({ from: Manufacturer });
  console.log('Waiting for Transaction Hash...')
  console.log(receipt);
  console.log(receipt.carId);
  setReceipt({
    Receipt:(receipt.transactionHash)
  })
}


const approve = async () => {
  console.log("Approving Dealer To Sell")
  const carId = '3'
  const receipt = await MyMotors.methods.Approve(carId).send({ from: Manufacturer });
  console.log('Waiting for Transaction Hash...')
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  setReceipt({
    Receipt:(receipt.transactionHash)
  })
}

const SellCar = async () => {
  console.log("Listing Car For Sell")
  const carId = '3'
  const Price = '2'
  const receipt = await MyMotors.methods.sellCar(carId,Price).send({ from: Dealer });
  console.log('Waiting for Transaction Hash...')
  console.log(receipt);
  setReceipt({
    Receipt:(receipt.transactionHash)
  })
}

const BuyCar = async () => {
  console.log("Purchasing Car")
  const carId = '3'
  const Amount = '2'
  const receipt = await MyMotors.methods.buyCar(carId,Amount).send({ from: Customer });
  console.log('Waiting for Transaction Hash...')
  console.log(receipt);
  setReceipt({
    Receipt:(receipt.transactionHash)
  })
}

const GetOwner = async () => {
  console.log("Fetching the Owner")
  const carId = '3'
  const receipt = await MyMotors.methods.getOwner(carId).call();
  console.log('Waiting for Transaction')
  console.log(receipt);
  setReceipt({
    Receipt:(receipt)
  })
}

const Clearc = async()=> {

  setReceipt({
    Receipt: null
  })
}


return (
    <div className="App">
      <header className="App-header">
      <div className="App-logo">
            <img src={carLogo} alt=""/>
        </div>
      <div><p>
          Welcome to MyMotorCo.
      </p></div>

        <a
          className="btn-stl1"
          href="https://rinkeby.etherscan.io/address/0xdfa001b4470cd9b5bf6147c6d57f618e797d147c"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check EtherScan(MyMotors)
        </a>
      </header>
      <div>
      <body>
        <div>
          <p className="top-header">
            Contract Interaction.
        </p>
        </div>
        <div>
        <button className="btn-stl" onClick={()=>Configure()}>Configure</button>

        <button className="btn-stl" onClick={()=>Manufacture()}>Manufacture Car</button>

        <button className="btn-stl" onClick={()=>approve()}>Approve Dealer</button>

        <button className="btn-stl" onClick={()=>SellCar()}>List For Sell</button>  

        <button className="btn-stl" onClick={()=>BuyCar()}>Buy Car</button>

        <button className="btn-stl" onClick={()=>GetOwner()}>Get Owner Of Car</button>
        </div>
        <div>
        <b1 className="top-header1">{txnReceipt.Receipt}</b1>
        {console.log(txnReceipt)}
        </div>
        <div>
        <button className="btn-stl" onClick={()=>Clearc()}>Clear Console</button>
        </div>
      </body>
    </div>
    </div>
    
  );
}

export default App;
