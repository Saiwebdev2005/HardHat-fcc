require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomicfoundation/hardhat-verify");
require("./tasks/block-number");
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/8cAuHYtk5pZaV5S4z9QKIKLbAj3JEc3i"
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "976ec26d8620bbdeff41ac071ad26407ee1bd7e03cf7b10d27067e91ccfc2ff9"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
   sepolia:{
    url: SEPOLIA_RPC_URL,
    accounts: [PRIVATE_KEY],
    chainId:11155111,
   }
  },
  solidity: "0.8.19",
  etherscan:{
    apiKey:ETHERSCAN_API_KEY,
  }
};
