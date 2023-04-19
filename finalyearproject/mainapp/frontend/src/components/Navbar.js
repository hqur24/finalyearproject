import React, { Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import {connect } from 'react-redux';
import { logout } from "../actions/authActions";

const Navbar = ({isAuthenticated, logout}) => {

    return (
    <div>
<nav className="navbar navbar-expand-lg bg-white">
  <a className="navbar-brand" href="#">S.P.A</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-left">
      <li className="nav-item active">
      <NavLink className="nav-link active" to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link active" to="/assignments">Assignments</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link active" to="/exams">Exams</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link active" to="/applications">Applications</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link active" to="/moods">Mood Tracker</NavLink>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
    <li className="nav-item active">
        <a className="nav-link"onClick={logout} href='#!'>Logout <span className="sr-only">(current)</span></a>
      </li>
      </ul>
  </div>
</nav>
</div>
    )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { logout })(Navbar);