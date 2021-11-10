//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0; 

contract ApiDemo {
    uint public price;

    event CallApi(string url);

    function updatePrice() public {
        emit CallApi("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
    }

    function callBack(uint _price) public { 
        price = _price;
    }
}
