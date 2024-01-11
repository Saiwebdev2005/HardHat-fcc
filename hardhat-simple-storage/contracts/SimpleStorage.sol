// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

// A contract named SimpleStorage
contract SimpleStorage {
    // A state variable 'favNo' of type uint (unsigned integer)
    uint favNo;

    // A struct named 'People' with two fields: 'favNo' and 'name'
    struct People{
        uint favNo;
        string name;
    }

    // An array 'people' of type 'People' which is publicly accessible
    People[] public people;

    // A mapping 'nameToFavNo' from string to uint which is publicly accessible
    mapping(string => uint) public nameToFavNo;

    // A function 'store' that takes an unsigned integer '_favNo' as input
    // and stores it in the state variable 'favNo'
    function store(uint _favNo) public virtual  {
        favNo = _favNo;
    }

    // A function 'retrieve' that returns the current value of the state variable 'favNo'
    function retrieve() public view returns (uint){
        return favNo;
    }

    // A function 'addPerson' that takes a string '_name' and an unsigned integer '_favNo' as input
    // It creates a new 'People' struct with these values and adds it to the 'people' array
    // It also updates the 'nameToFavNo' mapping with the '_name' and '_favNo' pair
    function addPerson(string memory _name,uint _favNo) public{
        people.push(People(_favNo,_name));
        nameToFavNo[_name] = _favNo;
    }
}
