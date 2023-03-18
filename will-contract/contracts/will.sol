// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Will {
    address private owner;
    address private _heir; 
    bool private isAlive;

    event OwnerChanged(address newOwner);
    event ChangeHeir(address newHeir);
    event IsAliveChanged(bool isAlive);
    event FundsTransferred(address recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
        isAlive = true;
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "Only owners can change owner");
        owner = newOwner;
        emit OwnerChanged(newOwner);
    }

    function setHeir(address heir) public {
        require(msg.sender == owner, "Only owners can set heir");
        _heir = heir;
    }

    function changeHeir(address newHeir) public {
        require(msg.sender == owner, "Only owners can remove a heir");
        _heir = newHeir;
        emit ChangeHeir(newHeir);
    }

    function changeIsAlive(bool _isAlive) public {
        require(msg.sender == owner, "Only the owner can change the status");
        isAlive = _isAlive;
        emit IsAliveChanged(_isAlive);
    }

    function transferFunds(address payable recipient, uint256 amount) public {
        require(msg.sender == owner || (msg.sender == _heir && !isAlive), "Only the owner or heir can transfer funds");
        require(amount <= address(this).balance, "Insufficient funds");
        recipient.transfer(amount);
        emit FundsTransferred(recipient, amount);
    }
    
    function getOwner() public view returns (address) {
        return owner;
    }
    
    function getHeir() public view returns (address) {
        return _heir;
    }
    
    function getIsAlive() public view returns (bool) {
        return isAlive;
    }
    
    receive() external payable {}
}