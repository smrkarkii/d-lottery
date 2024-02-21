// Import only ethers from the 'ethers' library
import { ethers } from "ethers";

import "../App.css";
import { useState, useEffect, useCallback } from "react";
import constants from "../constants";

function Home() {
  const [manager, setManager] = useState("");
  const [account, setAccount] = useState("");
  const [state, setState] = useState({
    provider: "",
    signer: "",
    contract: "",
  });
  const { contract } = state;
  function saveState(state) {
    setState(state);
  }
  let templist = [];
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  const [isParticipate, setParticipate] = useState(0);

  console.log("priting count", count);

  const participate = useCallback(async () => {
    if (state) {
      const amountToSend = 10;
      console.log("participating in the lottery");
      const tx = await contract.participate({ value: amountToSend });
      await tx.wait();
      setParticipate((prevState) => prevState + 1);
      console.log("participated", participate);
    } else {
      console.log("no contract");
    }
  }, []);

  useEffect(() => {
    const loadBLockchain = async () => {
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
  }, [account]);

  useEffect(() => {
    const callingParticipants = async () => {
      if (contract) {
        console.log("inside participants");
        const temp = await contract.count();
        const inttemp = parseInt(temp);

        setCount(inttemp);
        console.log("priting count", count);
        for (var i = 0; i < inttemp; i++) {
          const lists = await contract.participants(i);
          templist.push(lists);
        }
        setParticipants(templist);
        console.log("printing list of participants", templist);

        // console.log("printing participants", lists);
      }
    };
    callingParticipants();
  }, []);

  return (
    <>
      <p className="account">Your account is : {account}</p>
      <div className="Home" style={{ textAlign: "center" }}>
        <header className="header">Decentralized Lottery System</header>
        <p>{account}</p>
        <p>Manager {manager}</p>
      </div>
      <div className="participantss">);</div>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="Participants text-center mt-4">
          <button className="btn btn-success btn-lg" onClick={participate}>
            Participate in the lottery
          </button>
          <h2 className="mt-3">Participants</h2>
          <p className="mb-3">No of participants: {count}</p>
        </div>
        <div className="lists mt-4 d-flex justify-content-center">
          <ul className="list-group">
            {participants.map((participant, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-primary"
              >
                {participant}
              </li>
            ))}
          </ul>
        </div>
      </div>
      );
    </>
  );
}

export default Home;
