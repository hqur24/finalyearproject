// import React, { Fragment } from "react";
// import { Link, NavLink } from 'react-router-dom';
// import {connect } from 'react-redux';
// import { logout } from "../actions/authActions";

// const Navbar = ({isAuthenticated, logout}) => {


//   const authenticatedLinks = (
//     <Fragment>
//              <li className="nav-item">
//       <NavLink className="nav-link active" to='/dashboard'>Dashboard</NavLink>
//     </li>

//     <li className="nav-item">
//     <a  className="nav-link" onClick={logout} href='#!'>Logout</a>
//   </li>   
//     </Fragment>
// )

//     const guestLinks = (
//         <Fragment>
//                  <li className="nav-item">
//           <NavLink className="nav-link active" to='/login' >Login</NavLink>
//         </li>

//         <li className="nav-item">
//         <NavLink className="nav-link active" to='/register' >Register</NavLink>
//       </li>   
//         </Fragment>
//     )

//     return (
//     <div>
// <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <NavLink className="navbar-brand" to="/">Student App</NavLink>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <NavLink className="nav-link active" to="/">Home</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link active" to="/">Features</NavLink>
//         </li>
//         { isAuthenticated ? authenticatedLinks : guestLinks}
//       </ul>
//     </div>
//   </div>
// </nav>   
// </div>
//     )
// };
// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });


// export default connect(mapStateToProps, { logout })(Navbar);

import React, { Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import {connect } from 'react-redux';
import { logout } from "../actions/authActions";

const Navbar = ({isAuthenticated, logout}) => {

    return (
    <div>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
    <NavLink className="navbar-brand" to="/">S.P.A</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link active" to="/">Assignments</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" to="/">Exams</NavLink>
        </li>
        <li className="nav-item">
      <NavLink className="nav-link active" to='/'>Applications</NavLink>
    </li>

    <li className="nav-item">
    <a  className="nav-link" onClick={logout} href='#!'>Logout</a>
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