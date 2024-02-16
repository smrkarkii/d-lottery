import "../App.css";
import { useEffect, useState } from "react";

function Manager({ state }) {
  // const [contract, setcontract] = useState();
  const { contract } = state;
  const [winner, setWinner] = useState("00");

  const [manager, setManager] = useState("");

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

  useEffect(() => {
    const managerFetch = async () => {
      if (contract) {
        const manager = await contract.manager();
        console.log("fetching manager", manager);
        setManager(manager);
      }
    };

    const fetchWinner = async () => {
      if (contract) {
        const winners = await contract.winner();
        console.log(winners);
        setWinner(winners);
      }
    };
    fetchWinner();
    managerFetch();
  }, [contract, winner]);

  return (
    <div className="Manager" style={{ textAlign: "center" }}>
      <header className="header">Manager site</header>
      <p>Managaer: {manager}</p>
      <button
        className="btn-success btn-lg"
        onClick={chooseWinner}
        style={{ textAlign: "center" }}
      >
        Choose winner
      </button>
      <p>The winner of the lottery is: {winner}</p>
    </div>
  );
}

export default Manager;
