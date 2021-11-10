// Request Link at https://faucets.chain.link/rinkeby.

import fs from "fs";
import { ethers, artifacts } from "hardhat";
import { APIConsumer } from "../typechain/APIConsumer";
import { ERC20__factory } from "../typechain";
import { parseEther } from "@ethersproject/units";

async function main() {
  const contract = await ethers.getContractFactory("APIConsumer");
  const api = await contract.deploy();

  const [deployer] = await ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const linkAddress = `0x01BE23585060835E02B77ef475b0Cc51aA1e0709`;
  const link = ERC20__factory.connect(linkAddress, deployer);
  console.log('Link balance: ' + await link.balanceOf(deployer.address));

  const linkAmount = parseEther("0.5"); // send 0.5 Link to api contract
  const tx1 = await link.approve(api.address, linkAmount );
  await tx1.wait();

  const tx2 = await link.transfer(api.address, linkAmount ); 
  await tx2.wait();
  console.log(`Transfer ${linkAmount} Link token to ${api.address}`);
  
  const tx3 = await api.requestVolumeData();
  await tx3.wait();

  console.log('Volume: ' + await api.volume()); // not finish 
  saveContract(api);

}

function saveContract(api: APIConsumer) {
  const path = __dirname + '/../frontend/src/contracts';
  if (!fs.existsSync(path))
    fs.mkdirSync(path);
  fs.writeFileSync(`${path}/address.json`,
    JSON.stringify({ address: api.address }, undefined, 2))
  fs.writeFileSync(`${path}/abi.json`,
    JSON.stringify(artifacts.readArtifactSync('APIConsumer'), undefined, 2))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
