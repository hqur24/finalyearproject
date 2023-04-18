import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatusAssignment from "./UpdateStatusModals/UpdateStatusAssignment";
import UpdateDateAssignment from "./UpdateDateModals/UpdateDateAssignment";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  // update status functionality
  const [openStatusModal, setOpenStatusModal] = useState(false);
  //update date functionality
  const [openDateModal, setOpenDateModal] = useState(false);

  const [assignmentId, setAssignmentId] = useState();
  const [assignmentTitle, setAssignmentTitle] = useState();
  const [assignmentStatus, setAssignmentStatus] = useState();
  const [assignmentDueDate, setAssignmentDueDate] = useState();

  const [refreshButton, setRefreshButton] = useState(false);

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
  }, [refreshButton]);

  const refreshButtonClick = () => {
    setRefreshButton(!refreshButton);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={refreshButtonClick}
      >
        Refresh Assignments
      </button>
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
                  setOpenStatusModal(true);
                  setAssignmentId(assignment.id);
                  setAssignmentTitle(assignment.assignment_title);
                  setAssignmentStatus(assignment.assignment_status);
                }}
              >
                Update Status
              </button>

              {openStatusModal ? (
                <UpdateStatusAssignment
                  closeUpdateModal={() => setOpenStatusModal(false)}
                  assignmentId={assignmentId}
                  assignmentTitle={assignmentTitle}
                  previousAssignmentStatus={assignmentStatus}
                />
              ) : null}
            </p>
            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenDateModal(true);
                  setAssignmentId(assignment.id);
                  setAssignmentTitle(assignment.assignment_title);
                  setAssignmentDueDate(assignment.assignment_due_date);
                }}
              >
                Update Due Date
              </button>

              {openDateModal ? (
                <UpdateDateAssignment
                  closeUpdateModal={() => setOpenDateModal(false)}
                  assignmentId={assignmentId}
                  assignmentTitle={assignmentTitle}
                  previousAssignmentDueDate={assignmentDueDate}
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
