import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-dark ml-auto "
        style={{ color: "#0583d2", backgroundColor: "white" }}
      >
        <a href="/home" className="navbar-brand head-name">
          Decentralized Lottery{" "}
        </a>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul
            className="navbar-nav ml-auto list-unstyled"
            style={{ marginLeft: "auto" }}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manager">
                Manager site
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/winner">
                Winner
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
