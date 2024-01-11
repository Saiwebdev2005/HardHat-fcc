// Import the Hardhat runtime environment (hre)
const hre = require("hardhat");

// Import the 'expect' and 'assert' functions from the Chai assertion library
const {expect,assert} = require("chai");

// Define a test suite for the SimpleStorage contract
describe("SimpleStorage",() => {
  // Declare variables in the global scope of the test suite
  let simpleStorageFactory,simpleStorage;

  // A function that runs before each test in the test suite
  beforeEach(async () => {
    // Get the contract factory for the SimpleStorage contract
    simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");

    // Deploy the SimpleStorage contract
    simpleStorage = await simpleStorageFactory.deploy();
  });

  // A test that checks if the SimpleStorage contract starts with a favorite number of 0
  it("Should start with a fav no of 0", async () => {
    // Retrieve the current value from the SimpleStorage contract
    const currentValue = await simpleStorage.retrieve();

    // The expected value is "0"
    const expectedValue = "0";

    // Assert that the current value is equal to the expected value
    assert.equal(currentValue.toString(),expectedValue);
  });

  // A test that checks if the SimpleStorage contract updates when the store function is called
  it("Should update when we call store",async () => {
    // The expected value is "7"
    const expectedValue = "7";

    // Call the store function on the SimpleStorage contract
    const txeResp = await simpleStorage.store(expectedValue);

    // Wait for the transaction to be mined
    await txeResp.wait(1);

    // Retrieve the current value from the SimpleStorage contract
    const currVal = await simpleStorage.retrieve();

    // Assert that the current value is equal to the expected value
    assert.equal(currVal.toString(),expectedValue);
  });
});
