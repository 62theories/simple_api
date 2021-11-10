import fs from "fs";
import { ethers, artifacts } from "hardhat";
import { ApiDemo } from "../typechain/ApiDemo";

async function main() {
  const contract = await ethers.getContractFactory("ApiDemo");
  const api = await contract.deploy();

  await api.updatePrice();

  console.log("Api demo deployed to:", api.address);
  console.log("price: " + (await api.price()));
  saveContract(api);
}

function saveContract(api: ApiDemo) {
  const path = __dirname + '/../frontend/src/contracts';
  if (!fs.existsSync(path))
    fs.mkdirSync(path);
  fs.writeFileSync(`${path}/address.json`,
    JSON.stringify({ address: api.address }, undefined, 2))
  fs.writeFileSync(`${path}/abi.json`,
    JSON.stringify(artifacts.readArtifactSync('ApiDemo'), undefined, 2))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
