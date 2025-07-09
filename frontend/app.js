document.addEventListener("DOMContentLoaded", () => {
  const mintBtn = document.getElementById("mintBtn");

  mintBtn.onclick = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; 
      const abi = [
        {
          "inputs": [
            { "internalType": "string", "name": "_tokenURI", "type": "string" }
          ],
          "name": "mint",
          "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const testURI = "ipfs://QmTestExampleMetadataUri"; // ✅ This should match how your contract expects it
      const tx = await contract.mint(testURI);
      await tx.wait();

      alert("✅ NFT Minted!");
    } catch (error) {
      console.error("❌ Minting failed:", error);
      alert(`❌ Minting failed: ${error.message}`);
    }
  };
});
