const hre = require("hardhat")

async function main() {
    const SimpleStorageFactory = await hre.ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    console.log(`SimpleStorage deployed to ${simpleStorage.target}`)

    //for getting the information about our network
    console.log(hre.network.config);
    if(hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY)
    {
        console.log("Waiting for block txes...")
     await simpleStorage.deployTransaction.wait(6);
     await verify(simpleStorage.address,[])
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is: ${currentValue}`)

    //Update the current value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract.....")
    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArgument: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified"))
            console.log("Already Verified")
        else console.log(e)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
