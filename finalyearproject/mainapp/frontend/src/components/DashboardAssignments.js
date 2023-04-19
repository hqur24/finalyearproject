import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/items/assignments/")
      .then((response) => {
        const assignments = response.data.assignments;
        setAssignments(assignments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {assignments.map((assignment, index) => (
        <div class="card bg-light mb-3 dashboard-card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{assignment.assignment_title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Due date: <FormatDate dateString={assignment.assignment_due_date}/> </h6>
            <p>{assignment.assignment_desc}</p>
            <p>Author: {assignment.author}</p>
            <p>
              Status: {assignment.assignment_status ? "Complete" : "Incomplete"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAssignments;
