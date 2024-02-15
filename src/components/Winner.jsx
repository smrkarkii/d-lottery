// import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "../App.css";

function Winner({ state }) {
  const [winner, setWinner] = useState("00");
  const { contract } = state;

  useEffect(() => {
    const fetchWinner = async () => {
      if (contract) {
        const winners = await contract.winner();
        console.log(winners);
        setWinner(winners);
      }
    };
    fetchWinner();
  }, []);
  return (
    <div className="Winner" style={{ textAlign: "center" }}>
      <header className="header">Winner</header>
      <p>The winner of the lottery is: {winner}</p>
    </div>
  );
}

export default Winner;
