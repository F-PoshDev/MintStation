const hre = require("hardhat");

async function main() {
  // 1. Get the contract factory
  const Diary = await hre.ethers.getContractFactory("PoshDevChainDiary");

  // 2. Deploy
  const diary = await Diary.deploy();

  // 3. Wait until it’s mined (v6 uses waitForDeployment)
  await diary.waitForDeployment();

  // 4. Log the address
  console.log("PoshDevChainDiary deployed to:", diary.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
