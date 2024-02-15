// import logo from "./logo.svg";
import "../App.css";
import { useEffect, useState } from "react";

function Manager({ state }) {
  const { contract } = state;
  const [winner, setWinner] = useState("00");

  const chooseWinner = async () => {
    if (contract) {
      console.log("Choosing winner");
      const tx = await contract.chooseWinner();
      await tx.wait();
      console.log("chosen winner");
    }
  };

  useEffect(() => {
    const fetchWinner = async () => {
      if (contract) {
        const winners = await contract.winner();

        console.log(winners);
        setWinner(winners);
      }
    };
    fetchWinner();
  }, [winner]);
  return (
    <div className="Manager" style={{ textAlign: "center" }}>
      <header className="header">Manager site</header>
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
