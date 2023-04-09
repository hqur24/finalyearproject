import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import UpdateAssignment from "./UpdateModals/UpdateAssignment";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [assignmentId, setAssignmentId] = useState();
  const [assignmentTitle, setAssignmentTitle] = useState();
  const [assignmentStatus, setAssignmentStatus] = useState();

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
        <div class="card bg-light mb-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{assignment.assignment_title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Due date: {assignment.assignment_due_date}
            </h6>
            <p>{assignment.assignment_desc}</p>
            <p>Author: {assignment.author}</p>
            {/* <p>Status: {assignment.assignment_status.toString()} </p> */}
            <p>
              Status: {assignment.assignment_status ? "Complete" : "Incomplete"}
            </p>

            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenUpdateModal(true);
                  setAssignmentId(assignment.id);
                  setAssignmentTitle(assignment.assignment_title);
                  setAssignmentStatus(assignment.assignment_status);
                }}
              >
                Update Status
              </button>

              {openUpdateModal ? (
                <UpdateAssignment
                  closeUpdateModal={() => setOpenUpdateModal(false)}
                  assignmentId={assignmentId}
                  assignmentTitle={assignmentTitle}
                  previousAssignmentStatus={assignmentStatus}
                />
              ) : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ViewAssignments;
