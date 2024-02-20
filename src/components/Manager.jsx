import "../App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import constants from "../constants";

function Manager() {
  const [winner, setWinner] = useState("00");

  const [manager, setManager] = useState("");
  const [account, setAccount] = useState("");
  const [state, setState] = useState({
    provider: "",
    signer: "",
    contract: "",
  });
  const { contract } = state;
  const chooseWinner = async () => {
    if (contract) {
      console.log("Choosing winner");
      const tx = await contract.chooseWinner();
      await tx.wait();
      console.log("chosen winner");
    } else {
      console.log("no contract Instance");
    }
  };

  function saveState(state) {
    setState(state);
  }

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
          console.log("ad", account);

          const contractInstance = await new ethers.Contract(
            constants.contractAddress,
            constants.ABI,
            signer
          );
          if (contractInstance) {
            saveState({
              provider: provider,
              signer: signer,
              contract: contractInstance,
            });
            const manager = await contractInstance.manager();

            console.log("manager", manager);
            setManager(manager);
          }
        } catch (error) {
          console.error("Error loading blockchain:", error);
        }
      } else {
        window.alert("No metamask found");
      }
    };
    console.log("account", account);

    loadBLockchain();

    const fetchWinner = async () => {
      if (contract) {
        const winners = await contract.winner();
        console.log(winners);
        setWinner(winners);
      }
    };
    loadBLockchain();
    fetchWinner();
  }, [winner, account]);

  return (
    <>
      {account === manager ? (
        <>
          <p className="account">Your account is: {account}</p>

          <div className="Manager" style={{ textAlign: "center" }}>
            <header className="header">Manager site</header>
            <p>Manager: {manager}</p>
            <button
              className="btn-success btn-lg"
              onClick={chooseWinner}
              style={{ textAlign: "center" }}
            >
              Choose winner
            </button>
            <p>The winner of the lottery is: {winner}</p>
          </div>
        </>
      ) : (
        <>
          <div className="Manager" style={{ textAlign: "center" }}>
            You are not a manager
          </div>
        </>
      )}
    </>
  );
}

export default Manager;
