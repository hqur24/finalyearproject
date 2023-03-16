import React from "react";
import { Navigate, Link } from "react-router-dom"

const Home = () => {
    return (
    <div className="container-fluid">
<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
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
    </div>
    </div>
    )
}
;

export default Home;