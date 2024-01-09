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
     await simpleStorage.deployTransaction.wait(6);
     await verify(simpleStorage.address,[])
    }
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
