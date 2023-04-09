import React, { useState} from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from 'react-redux'
import LearnMore from "../components/LearnMore/LearnMore";

const LandingPage = () => {
    const [open, setOpen] = useState(false);

    return (
    <div className="container-fluid">
    <div className="landingpage-container">
        <div className="row" align="center">
            <h5 className="centertext">Welcome</h5>
        </div>
        <div className="row" align="center">
            <h3 className="centertext">
                Student Application
            </h3>
        </div>
        <div className="row align-items-center">
            <div className="col" align="center">
                <Link to='/login'>
                    <button type="button" class="btn btn-primary" >Click here to login</button>
                </Link>
            </div>
            <div className="col" align="center">
                <Link to='/register'>
                    <button type="button" class="btn btn-primary">Click here to register</button>                        
                </Link>
            </div>
        </div>
        <div className="row align-items-center">
            <div className="col" align="center">
                <button type="button" className="btn btn-info" onClick={() => setOpen(true)}>Learn More</button>
                {open ? <LearnMore closeLearnMore={() => setOpen(false)} /> : null}
            </div>
        </div>
    </div>
    </div>
    )
};

export default LandingPage;