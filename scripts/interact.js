const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

  // Set a new message
  const tx = await myToken.setMessage("fposh web3 world welcome y'all!");
  await tx.wait();

  // Read the updated message
  const message = await myToken.getMessage();
  console.log("running interact script...", message);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
