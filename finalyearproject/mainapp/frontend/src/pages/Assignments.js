import React from "react";
import ViewAssignments from "../components/ViewAssignments";
import "../App.css";
import AddAssignment from "../components/AddAssignment";

const Assignments = () => {
  return (
    <div>
      <div class="row title-text">
        <h3>Assignments</h3>
      </div>
      <div class="row">
        <div class="col-8">
          <div className="dashboard-container-items">
            <h5 style={{ textAlign: "center" }}>Upcoming Assignments</h5>
            <p style={{ textAlign: "center" }}>Added items will appear here.</p>
            <ViewAssignments></ViewAssignments>
          </div>
        </div>

        <div class="col-4">
          <div className="dashboard-container-items">
            <h5 style={{ textAlign: "center" }}>Add Assignment</h5>
            <AddAssignment></AddAssignment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
