import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import logo from "../assets/logo.png";
import togglerIcon from "../assets/navbaricon.png";
const API_URL = process.env.REACT_APP_API_URL;

const Navbar = ({ isAuthenticated, logout }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(
        // "http://127.0.0.1:8000/accounts/currentuser/"
        `${API_URL}/accounts/currentuser/`,

      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.username);
        console.log("setting user:", data.username, data.id);
      } else {
        console.log("Error fetching current user");
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white">
        <a className="navbar-brand" href="#">
          {" "}
          <img className="navimg" src={logo} alt="My Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img className="menuimg" src={togglerIcon} alt="Menu Items" />{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-left">
            <li className="nav-item active">
              <NavLink className="nav-link active" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/assignments">
                Assignments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/exams">
                Exams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/applications">
                Applications
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/moods">
                Mood Tracker
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/help">
                Help
              </NavLink>
            </li>
            <li className="nav-item active">
              <a className="nav-link" onClick={logout} href="#!">
                LOGOUT <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                style={{
                  fontSize: "x-small",
                  fontStyle: "italic",
                  color: "lightslategrey",
                  maxWidth: "5vw",
                  textAlign: "center",
                  pointerEvents:"none"
                }}
              >
                Logged in as: {user}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
