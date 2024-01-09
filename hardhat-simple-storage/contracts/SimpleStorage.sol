// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint favNo;
    struct People{
        uint favNo;
        string name;
    }
    People[] public people;
    mapping(string => uint) public nameToFavNo;
    //virtual keyword is used in function so that it can be override
    function store(uint _favNo) public virtual  {
        favNo = _favNo;
    }

    function retrieve() public view returns (uint){
        return favNo;
    }
    function addPerson(string memory _name,uint _favNo) public{
        people.push(People(_favNo,_name));
        nameToFavNo[_name] = _favNo;
    }
}