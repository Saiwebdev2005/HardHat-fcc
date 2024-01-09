const hre = require("hardhat");

async function main() {
    const SimpleStorageFactory = await hre.ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
    console.log(`SimpleStorage deployed to ${simpleStorage.target}`);


}

async function verify(contractAddress , args){
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
