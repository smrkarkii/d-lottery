// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Lottery {
    address public manager;
    address payable[] public participants;
    address payable public winner;

    constructor() {
        manager = msg.sender;
    }

    function participate() public payable {
        require(msg.value == 10 wei);
        participants.push(payable(msg.sender));
    }

    function chooseWinner() public {
        require(msg.sender == manager, "You are not a manager");
        require(participants.length >= 3, "At least 3 participants are needed");

        uint win = randomNumber();
        uint rands = win % participants.length;
        winner = participants[rands];
        winner.transfer(getAmount());
        participants = new address payable[](0); //this will intiliaze the players array back to 0
    }

    function randomNumber() public view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    function getAmount() public view returns (uint) {
        require(manager == msg.sender, "You are not the manager");
        return address(this).balance;
    }
}
