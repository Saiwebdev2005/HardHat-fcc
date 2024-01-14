// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
library PriceConverter {
    function getPrice(AggregatorV3Interface priceFeed)internal  view returns(uint){
     //address 0x447Fd5eC2D383091C22B8549cb231a3bAD6d3fAf
     //ABI 
    (,int price,,,) = priceFeed.latestRoundData();
    //ETH in terms of USD
    return uint(price * 1e10); // 1**10 == 10000000000
  }
  function getConverstionRate(uint ethAmount,AggregatorV3Interface priceFeed) internal  view returns (uint) {
    uint ethPrice = getPrice(priceFeed);
    uint ethAmountInUsd = (ethPrice * ethAmount) /1e18;
    return  ethAmountInUsd;
  }
}