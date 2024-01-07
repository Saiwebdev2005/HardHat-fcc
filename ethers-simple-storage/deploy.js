const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545
  //our wallet location
  let url = "http://127.0.0.1:7545";
  let provider = new ethers.JsonRpcProvider(url);
  //connect wallet with private key
  const wallet = new ethers.Wallet(
    "0x2e6b6d89c54988910f16b7db24606b98707d084b1b6fb71552c6de0d1c130771",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  //use to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  //STOP here wait for contract to deploy
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
