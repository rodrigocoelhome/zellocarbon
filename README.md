# Polygon NFT Smart Contract on Amoy Testnet

This project is a simple ERC-721 NFT smart contract written in Solidity and deployed on the **Polygon Amoy Testnet** using **Hardhat** and **Ethers.js**.

## 🧱 Requirements

- Node.js (v18+ recommended)
- NPM or Yarn
- Hardhat
- MetaMask wallet
- [Alchemy](https://alchemy.com/), [Infura](https://infura.io/), or any RPC provider (optional)
- MATIC test tokens on the Amoy Testnet ([request here](https://faucet.polygon.technology/))

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file in the project root**

```env
PRIVATE_KEY=your_private_key_here
```

> ⚠️ Never share your private key publicly.

4. **Check the Hardhat configuration**
Make sure your `hardhat.config.ts` contains the Amoy Testnet setup:

```ts
networks: {
  amoy: {
    url: "https://rpc-amoy.polygon.technology",
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    chainId: 80002,
  }
}
```

## 🛠️ Compile the Contract

```bash
npx hardhat compile
```

## 📦 Deploy to Amoy Testnet

```bash
npx hardhat run scripts/deploy.ts --network amoy
```

The deployed contract address will be printed in the terminal.

## 🧪 Mint an NFT (using Hardhat Console)

```bash
npx hardhat console --network amoy
```

Then run:

```js
const nft = await ethers.getContractAt("PolygonNFT", "YOUR_CONTRACT_ADDRESS");
await nft.mintNFT("YOUR_WALLET_ADDRESS", "https://your-ipfs-link/metadata.json");
```

## 🧾 Metadata Format

The metadata should be a publicly accessible JSON file. Example:

```json
{
  "name": "My First NFT",
  "description": "This is an NFT on Polygon Amoy Testnet",
  "image": "https://ipfs.io/ipfs/your-image-cid",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Unique"
    }
  ]
}
```

You can host this on:
- [https://nft.storage](https://nft.storage)
- [https://pinata.cloud](https://pinata.cloud)
- [https://arweave.net](https://arweave.net)

## 🌐 View Your NFT

To view your NFT on OpenSea Testnet:

```
https://testnets.opensea.io/assets/amoy/YOUR_CONTRACT_ADDRESS/TOKEN_ID
```

## 📄 License

MIT License.
