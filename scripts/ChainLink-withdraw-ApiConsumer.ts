import { ethers } from "hardhat"; 
import { ERC20__factory, APIConsumer__factory } from "../typechain"; 
import { address } from "../frontend/src/contracts/address.json";

const linkAddress = `0x01BE23585060835E02B77ef475b0Cc51aA1e0709`;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const apiConsumer = APIConsumer__factory.connect(address, deployer);  

  const link = ERC20__factory.connect(linkAddress, deployer);
  console.log('Link balance before withdraw: ' + await link.balanceOf(deployer.address));

  const tx = await apiConsumer.withdrawLink();
  await tx.wait();
  
  console.log('Link balance after withdraw: ' + await link.balanceOf(deployer.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
