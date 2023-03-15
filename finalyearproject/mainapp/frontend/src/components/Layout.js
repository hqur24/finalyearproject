import React, { Fragment, useEffect } from "react";
import Navbar from '../components/Navbar';
import { connect } from "react-redux";
import { checkAuthenticated } from "../actions/authActions";


const Layout = ({ children, checkAuthenticated }) => {

    useEffect(() => {
        checkAuthenticated();
    }, [] );

return (
    <Fragment>
        <Navbar/>
        {children}
    </Fragment>
)
};

export default connect(null, { checkAuthenticated })(Layout);