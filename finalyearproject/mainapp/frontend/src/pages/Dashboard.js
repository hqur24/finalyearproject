import React from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import ViewMoods from "../components/ViewMoods";
import ViewAssignments from "../components/ViewAssignments";
import ViewExams from "../components/ViewExams";

const Dashboard = () => {
  return (
    <div>
      <div class="row title-text">
        <h3>Dashboard</h3>
      </div>
      <div class="row">
        <div class="col-4">
          <div className="dashboard-container-items">
            <h5>Upcoming Assignments</h5>
            <p>Go to the assignments page to view all and add more.</p>
            <ViewAssignments></ViewAssignments>
          </div>
        </div>

        <div class="col-4">
          <div className="dashboard-container-items">
            <h5>Upcoming Exams</h5>
            <p>Go to the exams page to view all and add more.</p>
            <ViewExams></ViewExams>
          </div>
        </div>

        <div class="col-2">
          <div className="dashboard-container-items">
            <h5>Mood Log</h5>
            <ViewMoods></ViewMoods>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default connect(null, { isAuthenticated })(Dashboard);
export default Dashboard;
