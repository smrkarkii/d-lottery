import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-auto">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Decentralized Lottery
        </Link>

        <div className="" id="navbarNav">
          <ul className="navbar-nav list-unstyled">
            <li className="nav-item">
              <Link className="nav-link" to="/">
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
      </div>
    </nav>
  );
};

export default Navbar;
