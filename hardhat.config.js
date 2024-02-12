require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

// require("@nomniclabs/hardhat-waffle");

// task("accounts", "Prints the list of accounts", async (tasksArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/mm-xT0j7xWytbX6ikkzdGJQFQX3QzYQr",
      accounts: [
        "1f7b221d9f3ff1c1f82d2e71f1a0382442f8018b76cc0ca2cf5149f6140281bf",
      ],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
