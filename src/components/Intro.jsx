// Import only ethers from the 'ethers' library
import { ethers } from "ethers";

import "../App.css";
import { useState, useEffect, Link } from "react";
import constants from "../constants";

const Intro = ({ state }) => {
  return (
    <>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item">
            <Link to="/manager" className="text-decoration-none text">
              <button className="button1">Manager</button>
            </Link>

            <Link to="/home" className="text-decoration-none text">
              <button className="button1 player">Player</button>
            </Link>
          </li>
        </div>
      </ul>
    </>
  );
};

export default Intro;
