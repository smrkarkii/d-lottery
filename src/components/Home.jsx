// Import only ethers from the 'ethers' library
import { ethers } from "ethers";

import "../App.css";
import { useState, useEffect } from "react";
import constants from "../constants";

function Home() {
  const [contractInstance, setContractInstance] = useState("");
  const [account, setAccount] = useState("");
  const [winner, setWinner] = useState("");
  const [status, setStatus] = useState("");
  const [manager, setManager] = useState("");
  useEffect(() => {
    const loadBLockchain = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        window.ethereum.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });
      } else {
        window.alert("No metamask found");
      }
    };
    const contract = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        constants.contractAddress,
        constants.ABI,
        signer
      );
      // const status = contractInstance.isComplete();
      // setStatus(status);
      const manager = await contractInstance.manager.call();
      console.log("calling manager");
      console.log("manager", manager);
      setManager(manager);
    };
    loadBLockchain();
    contract();
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
      >
        Participate in the lottery
      </button>
    </div>
  );
}

export default Home;
