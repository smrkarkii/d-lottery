// import logo from "./logo.svg";
import "../App.css";

function Home() {
  function participate() {}
  return (
    <div className="Home" style={{ textAlign: "center" }}>
      <header className="header">Decentralized Lottery System</header>
      <button
        className="btn-success btn-lg"
        onClick={participate}
        style={{ textAlign: "center" }}
      >
        Participate in the lottery
      </button>
    </div>
  );
}

export default Home;
