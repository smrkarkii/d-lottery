// import logo from "./logo.svg";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { ethers } from "ethers";
import Home from "../src/components/Home";
import constants from "./constants";
import Participants from "./components/Participants";
import Winner from "./components/Winner";
import Manager from "./components/Manager";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [manager, setManager] = useState("");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
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
          const manager = await state.contract.manager();
          await manager.wait();

          console.log("manager", manager);
          setManager(manager);
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
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Intro state={state} />} /> */}
        {/* Render Home component along with Participants component */}
        <Route
          path="/home"
          element={
            <>
              <Home state={state} saveState={saveState} />
              <Participants state={state} />
            </>
          }
        />
        <Route path="/winner" element={<Winner state={state} />} />
        <Route path="/manager" element={<Manager state={state} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
