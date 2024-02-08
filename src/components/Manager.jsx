// import logo from "./logo.svg";
import "../App.css";

function Manager() {
  function chooseWinner() {}
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
    </div>
  );
}

export default Manager;
