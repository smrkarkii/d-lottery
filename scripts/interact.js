const { ethers } = require("hardhat");

const main = async () => {
  const account =
    "1f7b221d9f3ff1c1f82d2e71f1a0382442f8018b76cc0ca2cf5149f6140281bf";
  const RPC =
    "https://eth-sepolia.g.alchemy.com/v2/mm-xT0j7xWytbX6ikkzdGJQFQX3QzYQr";
  const contractAddress = "0x33E882728537BeF2A5E7d03d800D0bEBCD341569";
  const provider = new ethers.providers.JsonRpcProvider(RPC);

  async function call() {
    const bal = await provider.getBalance(account);
    console.log("balance  ", ethers.utils.formatEther(bal));
  }
  call();

  //   const lotteryContract = new ethers.Contract(contractAddress);
};

main()
  .then(() => process.exit(0))
  .catch((err) => console.log(err));
