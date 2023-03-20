import React, { useState } from "react";
import { connect } from 'react-redux'
import { login } from "../actions/authActions";

import { Navigate, Link } from "react-router-dom"
import CSRFToken from "../components/CSRFToken";

const Login = ({ login, isAuthenticated, loginError }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = loginData;
    const onChange = e => setLoginData({...loginData, [e.target.name]: e.target.value})
    // const [loginError, setLoginError] = useState(null);


    const onSubmit = e => {
        e.preventDefault();
        login(username, password)
    };

    if (isAuthenticated){
        return <Navigate to='/dashboard'/>
    }

    return (
        <div className="container-fluid">
            <div>
            <Link to='/'>
                <button type="button" class="btn btn-primary" >Back to landing page</button>
            </Link>
            </div>
            < div className="form-container">
            <h2>Login</h2>

            <form onSubmit={e=> onSubmit(e)}>
                <CSRFToken />

                <div className="form-group">
                    <label className="form-label">Username*</label>
                    <input className="form-control" type="text" placeholder="Enter username" onChange={e=> onChange(e)} value={username} name='username' required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Password*</label>
                    <input className="form-control" type="password" placeholder="Enter password" onChange={e=> onChange(e)} value={password} name='password' required/>
                </div>
  
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <br></br>
            {loginError && <p className="error-text">{loginError}</p>}

            <br></br>
            <h6> <Link to='/register'> If you do not have an account, click here to register.</Link></h6>
          </div>
        </div>
    )

}
const mapStateToProps = state => {
    console.log('isAuthenticated:', state.auth.isAuthenticated);
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loginError: state.auth.loginError

    }
  };

  
  
  
export default connect(mapStateToProps, { login }) (Login);
