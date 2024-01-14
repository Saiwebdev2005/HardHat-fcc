// SPDX-License-Identifier: MIT
//pragma
pragma solidity ^0.8.11;
//imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
//get funds from users
//withdraw funds
//set minimum funding valuein USD
//756611
//736642
//736630
//713483
error FundMe_NotOwner();

/**
 * @title A contract for crowd funding
 * @author Sai kumar
 * @notice This contract is to demo a sample funding contract
 */

contract FundMe {
    //Type Declaration
    using PriceConverter for uint;

    //state varaible
    uint public constant MIN_USD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint) public addressToAmountFunded;

    address public immutable i_owner;

    AggregatorV3Interface public priceFeed;

    //this is used to check some condition without recreating multiple times
    modifier only_i_owner() {
        // require(msg.sender == i_owner," Sender is not i_owner");
        if (msg.sender != i_owner) {
            revert FundMe_NotOwner();
        }
        //below is to execute other code of the function
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable {
        require(
            msg.value.getConverstionRate(priceFeed) > MIN_USD,
            "you need to spend more ETH! "
        ); // 1e18 = 1*10**18 == 1000000000000000
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public only_i_owner {
        for (
            uint funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);

        //call to send ether
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }
}
