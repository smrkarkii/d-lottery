// import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "../App.css";

function Participants({ state }) {
  const { contract } = state;
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  console.log("priting count", count);

  useEffect(() => {
    const callingParticipants = async () => {
      if (contract) {
        console.log("inside particiapnts");
        const temp = await contract.count();
        const inttemp = parseInt(temp);

        setCount(inttemp);
        console.log("priting count", count);
        // const lists = await contract.participants(0);

        // console.log("printing participants", lists);
      }
    };
    callingParticipants();
  }, [count, contract]);

  return (
    <>
      <div className="Participants" style={{ textAlign: "center" }}>
        <header className="header">Participants</header>
        <p>No of participants {count}</p>
      </div>
      <div className="lists">
        <ul className="list-group">
          <li className="list-group-item list-group-item-primary">{}</li>
        </ul>
      </div>
    </>
  );
}

export default Participants;
