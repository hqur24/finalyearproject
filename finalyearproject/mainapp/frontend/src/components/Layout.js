import React, { Fragment, useEffect } from "react";
import Navbar from '../components/Navbar';
import { connect } from "react-redux";
import { authenticationCheck } from "../actions/authActions";


const Layout = ({ children, authenticationCheck }) => {

    useEffect(() => {
        authenticationCheck();
    }, [] );

return (
    <Fragment>
        <Navbar/>
        {children}
    </Fragment>
)
};

export default connect(null, { authenticationCheck })(Layout);