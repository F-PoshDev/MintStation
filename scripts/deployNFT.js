const hre = require("hardhat");

async function main() {
  const PoshDevNFT = await hre.ethers.getContractFactory("PoshDevNFT");
  const nft = await PoshDevNFT.deploy();

  await nft.waitForDeployment();

  console.log("✅ PoshDevNFT deployed to:", await nft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
