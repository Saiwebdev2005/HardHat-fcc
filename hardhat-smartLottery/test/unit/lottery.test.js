
const {getNamedAccounts,deployments,ethers, network} = require("hardhat")
const {developmentChains,networkConfig} = require("../../helper-hardhat-config")
const { assert } = require("chai")

!developmentChains.includes(network.name) ? describe.skip : describe("Lottery Unit Tests",async () => {
  let lottery, vrfCoordinatorV2Mock
  const chainId = network.config.chainId

  beforeEach(async () => {
    const {deployer} = await getNamedAccounts()
    console.log('Deployer:', deployer)
    await deployments.fixture(["all"])
    lottery = await ethers.getContract("Lottery",deployer)
    console.log('Lottery:', lottery)
    vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock",deployer)
    console.log('VRFCoordinatorV2Mock:', vrfCoordinatorV2Mock)
  })
  
  describe("constructor", async () => {
    it("Initialize the lottery correctly", async () => {
      const lotteryState = await lottery.getLotteryState()
      const interval = await lottery.getInterval()
      assert.equal(lotteryState.toString(),"0")
      assert.equal(interval.toString(),networkConfig[chainId]["interval"])
      
    })
  })
})