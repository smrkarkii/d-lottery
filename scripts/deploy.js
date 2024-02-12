const { ethers } = require("hardhat");

const main = async () => {
  const Lottery = await ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();
  //   await lottery.deployed();
  console.log("lottery address", lottery.target);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
  });
