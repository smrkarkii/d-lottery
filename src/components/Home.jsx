// Import only ethers from the 'ethers' library
import { ethers } from "ethers";

import "../App.css";
import { useState, useEffect } from "react";
import constants from "../constants";

function Home({ saveState, state }) {
  const { contract } = state;
  // const [contract, setcontract] = useState("");
  const [account, setAccount] = useState("");

  const [manager, setManager] = useState("");

  useEffect(() => {
    const loadBLockchain = async () => {
      console.log("inside load blockchain function");
      if (window.ethereum) {
        try {
          if (contract) {
            const manager = await contract.manager();
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

    loadBLockchain();
    // contract();
  }, []);

  return (
    <div className="Home" style={{ textAlign: "center" }}>
      <header className="header">Decentralized Lottery System</header>
      <p>{account}</p>
      <p>Manager {manager}</p>
    </div>
  );
}

export default Home;
