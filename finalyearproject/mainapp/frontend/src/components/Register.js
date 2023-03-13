import { formToJSON } from "axios";
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom"
import { connect } from 'react-redux'
import { register } from "../actions/authActions";
import CSRFToken from "./CSRFToken";

const Register = ({ register, isAuthenticated }) => {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [accountSuccessfullyCreated, setAccountSuccessfullyCreated] = useState(false);

    const { username, email, password } = registerData;
    const onChange = e => setRegisterData({...registerData, [e.target.name]: e.target.value})


    const onSubmit = e => {
        e.preventDefault();
        register(username, email, password);
        setAccountSuccessfullyCreated(true)
    };
    if (isAuthenticated)
        return <Navigate to='/dashboard'/>
    else if(accountSuccessfullyCreated)
        return <Navigate to='/' />

    return (
        <div className="container">
            <h1>Registration</h1>
            <form onSubmit={e=> onSubmit(e)}>
                <CSRFToken />

                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text" placeholder="Enter username" onChange={e=> onChange(e)} value={username} name='username' required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-control" type="email" placeholder="Enter email address" onChange={e=> onChange(e)} value={email} name='email' required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" placeholder="Enter password" onChange={e=> onChange(e)} value={password} name='password' required/>
                </div>
  
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <br></br>
            <h6> <Link to='/login'> If you already have an account, click here to log in.</Link></h6>

        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register }) (Register);