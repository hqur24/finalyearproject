import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

const PrivateRouter = ({ children, isAuthenticated }) => {
    return (
    <>
    <div className='container-fluid fluid-auth'>
    <div className='authpages-container'>
    {isAuthenticated ?  <Navbar /> : <Navigate to="/" />}
    {children}</div></div>
  </>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(PrivateRouter);