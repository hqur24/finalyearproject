import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouter = ({ children, isAuthenticated }) => {
    return isAuthenticated  ?  children :  <Navigate to='/login' />
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(PrivateRouter);