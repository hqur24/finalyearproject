import React from "react";
import { Navigate, Link } from "react-router-dom"
import Layout from "../components/Layout";


const Home = () => {
    return (
        <Layout>
    <div className="container-fluid">
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
                    <button type="button" class="btn btn-homepage">Click here to login</button>
                </Link>
            </div>
            <div className="col" align="center">
                <Link to='/register'>
                    <button type="button" class="btn btn-homepage">Click here to register</button>                        
                </Link>
            </div>
        </div>
       

    </div>

        </Layout>
    

    )
};

export default Home;