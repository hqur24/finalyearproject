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

  // if date is in past and status is incomplete (false)
  const overdueAssignmentsArray = assignments.filter(
    (assignment) =>
      new Date(assignment.assignment_due_date) < new Date() &&
      !assignment.assignment_status
  );

  // if date is in future and status is either
  const currentAssignmentsArray = assignments.filter(
    (assignment) => new Date(assignment.assignment_due_date) > new Date()
  );

  //if status is complete (true) and date is either
  const pastAssignmentsArray = assignments.filter(
    (assignment) => assignment.assignment_status
  );

  const ooaLength = overdueAssignmentsArray.length;
  const caaLength = currentAssignmentsArray.length;
  const paaLength = pastAssignmentsArray.length;

  return (
    <div>
      <hr></hr>
      {ooaLength >= 1 && (
        <div className="overdue-container-dashboard">
          <h6>
            <i>Overdue!</i>
          </h6>
          {overdueAssignmentsArray.map((assignment, index) => (
            <div
              // key={index}
              className="card bg-light mb-3 item-card overdue-card"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <div className="card-heading">
                  <h5 className="card-title">{assignment.assignment_title}</h5>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                  Due date:
                  <FormatDate dateString={assignment.assignment_due_date} />
                </h6>
                <p>{assignment.assignment_desc}</p>
                <p>Author: {assignment.author}</p>
                <p>
                  Status:
                  {assignment.assignment_status ? "Complete" : "Incomplete"}
                </p>{" "}
              </div>
            </div>
          ))}
        </div>
      )}
      {caaLength >= 1 && (
        <div className="current-container">
          <h6>Current</h6>
          {currentAssignmentsArray.slice(0,4).map((assignment, index) => (
            <div
              class="card bg-light mb-3 item-card"
              style={{ width: "18rem" }}
            >
              <div class="card-body">
                <div className="card-heading">
                  <h5 class="card-title">{assignment.assignment_title}</h5>
                </div>

                <h6 class="card-subtitle mb-2 text-muted">
                  Due date:{" "}
                  <FormatDate dateString={assignment.assignment_due_date} />
                </h6>
                <p>{assignment.assignment_desc}</p>
                <p>Author: {assignment.author}</p>
                <p>
                  Status:
                  {assignment.assignment_status ? "Complete" : "Incomplete"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {paaLength >= 0 && (
        <div className="past-container">
          <h5>Completed Assignments</h5>
          <div>
            <p>
              Visit the assignments page to view your completed assignments.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAssignments;
