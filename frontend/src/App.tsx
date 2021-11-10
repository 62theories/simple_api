import { ethers } from "ethers";
import { address } from './contracts/address.json';
import { abi } from './contracts/abi.json';

import { ApiDemo } from "../../typechain/ApiDemo";
import { Web3Provider, JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

let provider: Web3Provider | JsonRpcProvider;
let signer: JsonRpcSigner
let api: ApiDemo;

function App({ }) {
  async function connect() {
    provider = new ethers.providers.Web3Provider((window as any).ethereum)
    await provider.send('eth_requestAccounts', []); // ethereum.enable()
    signer = provider.getSigner();
    console.log('signer: ', signer); 
    api = new ethers.Contract(address, abi, signer) as ApiDemo;
  }
 
  async function updatePrice() {
    if (api === undefined)
      await connect();
    api.updatePrice();
    api.once("CallApi", (to) => {
      console.log("call api: " + to);
      fetch(to)
        .then(response => response.json())
        .then(data => {
          console.log('data: ', data.RAW.ETH.USD.HIGH24HOUR*10**4)
          api.callBack(data.RAW.ETH.USD.HIGH24HOUR*10**4);
          alert(data.RAW.ETH.USD.HIGH24HOUR*10**4);
        })
    });
  }

  async function getPrice() {
    if ( api === undefined)
      await connect();
    const price = await api.price();
    console.log('price: ' +  price);
    alert(price);
  }

  return (
    <div> Hello
      <div>
        <button onClick={() => getPrice()}>Get Price</button>
        <button onClick={() => updatePrice()}>Update Price</button>
      </div>
    </div>);
}

export default App;