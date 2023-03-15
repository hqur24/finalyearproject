
import React from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom"
import ViewMoods from "../components/ViewMoods";
import ViewAssignments from "../components/ViewAssignments";
import ViewExams from "../components/ViewExams";


const Dashboard = () => {
    return (
    <div class="container-fluid">
        <div class="row">
            <h1>Dashboard</h1>
            <h6> <Link to='/login'> If you already have an account, click here to log in.</Link></h6>

        </div>
        <div class="row">
            <div class="col-sm">
                <ViewMoods></ViewMoods>

            </div>
            <div class="col-sm">
            <  ViewAssignments></ViewAssignments>
            
            </div>
            <div class="col-sm">
                <ViewExams></ViewExams>
            </div>
        </div>
    </div>
    )
};
  

// export default connect(null, { isAuthenticated })(Dashboard);
export default Dashboard;