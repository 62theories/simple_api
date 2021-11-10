import { ethers } from "hardhat"; 
import { APIConsumer__factory } from "../typechain"; 
import { address } from "../frontend/src/contracts/address.json";

async function main() {
  const [deployer] = await ethers.getSigners(); 
  const apiConsumer = APIConsumer__factory.connect(address, deployer); 
  console.log('Volume: ' + await apiConsumer.volume());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
