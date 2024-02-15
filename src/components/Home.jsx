// Import only ethers from the 'ethers' library
import { ethers } from "ethers";

import "../App.css";
import { useState, useEffect } from "react";
import constants from "../constants";

function Home({ saveState, state }) {
  const { contract } = state;
  const [contractInstance, setContractInstance] = useState("");
  const [account, setAccount] = useState("");

  const [manager, setManager] = useState("00");

  const participate = async () => {
    const amountToSend = 10;
    console.log("participating in the lottery");
    const tx = await contract.participate({ value: amountToSend });
    await tx.wait();
    console.log("participated");
  };

  useEffect(() => {
    const loadBLockchain = async () => {
      console.log("inside load blockchain function");
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0]);
          });

          const contractInstance = new ethers.Contract(
            constants.contractAddress,
            constants.ABI,
            signer
          );
          saveState({
            provider: provider,
            signer: signer,
            contract: contractInstance,
          });

          console.log("calling manager");
          // Check if the contract instance is not null or undefined
          if (contractInstance) {
            const manager = await contractInstance.manager();
            console.log("manager", manager);
            setManager(manager);
          } else {
            console.error("Contract instance is null or undefined");
          }
        } catch (error) {
          console.error("Error loading blockchain:", error);
        }
      } else {
        window.alert("No metamask found");
      }
    };

    // const loadBLockchain = async () => {
    //   console.log("inside load blockchian functoin");
    //   if (window.ethereum) {
    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //     const signer = await provider.getSigner();
    //     const address = await signer.getAddress();
    //     setAccount(address);
    //     window.ethereum.on("accountsChanged", (accounts) => {
    //       setAccount(accounts[0]);
    //     });
    //     // const provider = new ethers.BrowserProvider(window.ethereum);
    //     // const signer = await provider.getSigner();
    //     const contractInstance = new ethers.Contract(
    //       constants.contractAddress,
    //       constants.ABI,
    //       signer
    //     );
    //     saveState({
    //       provider: provider,
    //       signer: signer,
    //       contract: contractInstance,
    //     });
    //     console.log(
    //       "printing the state and contract instance",

    //       contractInstance
    //     );

    //     // const status = contractInstance.isComplete();
    //     // setStatus(status);

    //     console.log("calling manager");
    //     const manager = await contract.manager();
    //     // await manager.wait();

    //     console.log("manager", manager);
    //     setManager(manager);
    //   } else {
    //     window.alert("No metamask found");
    //   }
    // };
    // const contractFunc = async () => {
    //   try {
    //     console.log("inside contract functoin");
    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //     const signer = await provider.getSigner();
    //     const contractInstance = new ethers.Contract(
    //       constants.contractAddress,
    //       constants.ABI,
    //       signer
    //     );
    //     saveState({ contract: contractInstance });
    //     console.log("printing the state", state);

    //     // const status = contractInstance.isComplete();
    //     // setStatus(status);
    //     const manager = await state.contract.manager();
    //     console.log("calling manager");
    //     console.log("manager", manager);
    //     setManager(manager);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    loadBLockchain();
    // contract();
  }, []);

  return (
    <div className="Home" style={{ textAlign: "center" }}>
      <header className="header">Decentralized Lottery System</header>
      <p>{account}</p>
      <p>Manager {manager}</p>
      <button
        className="btn-success btn-lg"
        // onClick={participate}
        style={{ textAlign: "center" }}
        onClick={participate}
      >
        Participate in the lottery
      </button>
    </div>
  );
}

export default Home;
