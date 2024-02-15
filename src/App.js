// import logo from "./logo.svg";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "../src/components/Home";
import Participants from "./components/Participants";
import Winner from "./components/Winner";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  function saveState(state) {
    setState(state);
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Render Home component along with Participants component */}
        <Route
          path="/"
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
