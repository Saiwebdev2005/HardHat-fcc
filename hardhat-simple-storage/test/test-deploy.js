const hre = require("hardhat");
const {expect,assert} = require("chai")

describe("SimpleStorage",() => {
  //giving global scope
  let simpleStorageFactory,simpleStorage
  //it runs everytime before implementing it() method
  beforeEach(async () => {
    simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy();
  }) 
  it("Should start with a fav no of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0";
    assert.equal(currentValue.toString(),expectedValue)
  })

  it("Should update when we call store",async () => {
    const expectedValue = "7";
    const txeResp = await simpleStorage.store(expectedValue);
    await txeResp.wait(1)
    const currVal = await simpleStorage.retrieve();
    assert.equal(currVal.toString(),expectedValue)
  })
  
})