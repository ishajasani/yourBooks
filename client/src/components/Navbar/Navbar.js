import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/home">
          yourBooks
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${
                  location.pathname === "/home" ? "active fw-semibold" : ""
                }`}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${
                  location.pathname === "/about" ? "active fw-semibold" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
            <Link 
              className="btn btn-outline-primary px-4" 
              to="/login"
            >
              Login
            </Link>
            <Link 
              className="btn btn-primary px-4" 
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;