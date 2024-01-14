const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")


"This only run on  test net"
developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", () => {
          let fundMe, deployer
          const sendValue = ethers.utils.parseEth("1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })
          it("Allows people to fund and withdraw",async () => {
            await fundMe.fund({value:sendValue})
            await fundMe.withdraw()
            const endingBalance = await fundMe.provider.getBalance(fundMe.address)
            assert.equal(endingBalance.toString(),"0")
          })
      })
