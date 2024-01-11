// Import the Hardhat runtime environment (hre)
const hre = require("hardhat");

// The main function
async function main() {
    // Get the contract factory for the SimpleStorage contract
    const SimpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");

    // Deploy the contract
    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
    console.log(`SimpleStorage deployed to ${simpleStorage.target}`);

    // Log the network configuration
    console.log(hre.network.config);

    // If the chainId matches and an Etherscan API key is set, verify the contract
    if(hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...");
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    // Retrieve the current value from the contract and log it
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is: ${currentValue}`);

    // Store a new value in the contract
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);

    // Retrieve the updated value from the contract and log it
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
}

// The verify function
async function verify(contractAddress, args) {
    console.log("Verifying contract.....");
    try {
        // Run the Hardhat task 'verify:verify' to verify the contract on Etherscan
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArgument: args,
        });
    } catch (e) {
        // If the contract is already verified, log it. Otherwise, log the error.
        if (e.message.toLowerCase().includes("already verified"))
            console.log("Already Verified");
        else console.log(e);
    }
}

// Run the main function and handle any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
