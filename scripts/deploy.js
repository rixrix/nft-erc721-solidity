// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  const RixToken = await ethers.getContractFactory("NFT");
  console.log("Deploying RixToken ERC721 token...");
  const token = await RixToken.deploy("RixToken", "Rx");

  await token.deployed();

  console.log("RixToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
