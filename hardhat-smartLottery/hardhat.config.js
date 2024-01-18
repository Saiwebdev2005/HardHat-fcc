require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/8cAuHYtk5pZaV5S4z9QKIKLbAj3JEc3i"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY || "976ec26d8620bbdeff41ac071ad26407ee1bd7e03cf7b10d27067e91ccfc2ff9"
    const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "DTYVB7ZJTXFGCXNHQJSQS53UPJKR2FIT35"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmation: 1,
        },
        sepolia: {
            chainId: 11155111,
            blockConfirmation: 6,
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    solidity: "0.8.19",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
}
