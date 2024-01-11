// Import the Hardhat runtime environment (hre) configuration
const hre = require("hardhat/config");

// Define a new Hardhat task named 'block-number' with the description 'Prints the current block number'
hre.task("block-number","Prints the current block number").setAction(
  // The task's action is an asynchronous function
  async(taskArgs,hre) => {
    // Get the current block number from the Ethereum provider
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    // Log the current block number to the console
    console.log(`Current block number : ${blockNumber}`)
  }
)

// Export an empty object
module.exports = {}
