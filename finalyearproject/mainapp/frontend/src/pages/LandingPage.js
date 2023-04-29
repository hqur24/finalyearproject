import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import LearnMore from "../components/LearnMore/LearnMore";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container-fluid">
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div className="landingpage-container">
        <div className="row align-items-center">
          <center>
            <img className="landinglogo" src={logo} alt="My Logo" />
          </center>
        </div>
        <div className="row align-items-center">
          <div className="col" align="center">
            <Link to="/login">
              <button type="button" class="btn btn-primary">
                Click here to login
              </button>
            </Link>
          </div>
          <div className="col" align="center">
            <Link to="/register">
              <button type="button" class="btn btn-primary">
                Click here to register
              </button>
            </Link>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col" align="center">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setOpen(true)}
            >
              Learn More
            </button>
            {open ? <LearnMore closeLearnMore={() => setOpen(false)} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
