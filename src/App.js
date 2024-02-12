// import logo from "./logo.svg";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "../src/components/Home";
import Participants from "./components/Participants";
import Winner from "./components/Winner";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Render Home component along with Participants component */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Participants />
            </>
          }
        />
        <Route path="/winner" element={<Winner />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
