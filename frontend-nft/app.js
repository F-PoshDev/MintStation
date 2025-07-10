const contractAddress = "0xad769BD0c3242dB9c2ce0374ec16BcBfeA444d9f";
const contractABI = [ 
  // Only the relevant part (mint function) is shown to keep it simple
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
let contract;

async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    const address = await signer.getAddress();
    document.getElementById("walletStatus").innerText = `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
    console.log("Connected to:", address);
  } catch (error) {
    console.error("Connection error", error);
    document.getElementById("walletStatus").innerText = "Connection failed";
  }
}

async function mintNFT() {
  const nameInput = document.getElementById("nftName");
  const urlInput = document.getElementById("nftURL");
  const status = document.getElementById("mintStatus");

  if (!nameInput || !urlInput) {
    console.error("Input fields missing.");
    return;
  }

  const tokenURI = urlInput.value.trim();

  if (!tokenURI) {
    status.innerText = "Please provide an image URL.";
    return;
  }

  try {
    const tx = await contract.mint(tokenURI);
    status.innerText = "Minting in progress... please wait";
    await tx.wait();
    status.innerText = `✅ Minted NFT successfully!\nTransaction Hash: ${tx.hash}`;
  } catch (err) {
    console.error("Minting failed", err);
    status.innerText = "❌ Minting failed. Check console for details.";
  }
}
