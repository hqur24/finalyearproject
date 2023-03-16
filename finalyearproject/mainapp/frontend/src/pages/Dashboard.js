
import React from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom"
import ViewMoods from "../components/ViewMoods";
import ViewAssignments from "../components/ViewAssignments";
import ViewExams from "../components/ViewExams";


const Dashboard = () => {
    return (
    <div>
    <div class="row">
    <h3>Dashboard</h3>
</div>
        <div className="dashboard-container">

        <div class="row">
            <div class="col-sm">
            <  ViewAssignments></ViewAssignments>
            
            </div>
            <div class="col-sm">
                <ViewExams></ViewExams>
            </div>

            <div class="col-sm">
                <ViewMoods></ViewMoods>

            </div>

        </div>
        </div>
    </div>
    )
};
  

// export default connect(null, { isAuthenticated })(Dashboard);
export default Dashboard;