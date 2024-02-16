import React, { useEffect, useState, useCallback } from "react";
import "../App.css";

function Participants({ state }) {
  let templist = [];
  const { contract } = state;
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  const [isParticipate, setParticipate] = useState(0);

  console.log("priting count", count);

  const participate = useCallback(async () => {
    const amountToSend = 10;
    console.log("participating in the lottery");
    const tx = await contract.participate({ value: amountToSend });
    await tx.wait();
    setParticipate((prevState) => prevState + 1);
    console.log("participated", participate);
  }, []);

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
  }, [count, contract, participate]);

  return (
    <>
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

export default Participants;
