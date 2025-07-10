const contractAddress = "0xad769BD0c3242dB9c2ce0374ec16BcBfeA444d9f";

const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let signer;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const account = await signer.getAddress();
      document.getElementById('walletStatus').innerText = "Connected: " + account;
      console.log("Connected:", account);
    } catch (err) {
      console.error("Connection error", err);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function mintNFT() {
  const imageURL = document.getElementById("nftImage").value;
  const name = document.getElementById("nftName").value;

  if (!imageURL || !name) {
    alert("Please enter both name and image URL");
    return;
  }

  const metadata = {
    name: name,
    description: "Minted from PoshDev MintStation",
    image: imageURL
  };

  // Option 1: You already uploaded metadata.json to Pinata → use that tokenURI directly
  // const tokenURI = "ipfs://QmYourMetadataHash"

  // Option 2: You just use the image directly for now (not recommended for production)
  const tokenURI = imageURL;

  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mint(tokenURI);
    const receipt = await tx.wait();

    const mintedEvent = receipt.events.find(e => e.event === "Transfer");
    const tokenId = mintedEvent?.args?.tokenId?.toString();

    // Show success
    document.getElementById('mintResult').innerHTML = `
      ✅ <b>Minted NFT #${tokenId}</b><br/>
      <img src="${imageURL}" width="200" style="margin-top: 10px; border-radius: 10px;"><br/><br/>
      <a href="https://sepolia.etherscan.io/tx/${tx.hash}" target="_blank">🔗 View on SepoliaScan</a>
    `;

    console.log("Minted token:", tokenId);
  } catch (err) {
    console.error("Minting failed", err);
    alert("Minting failed. See console.");
  }
}
