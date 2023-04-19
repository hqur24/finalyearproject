import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatusAssignment from "./UpdateStatusModals/UpdateStatusAssignment";
import UpdateDateAssignment from "./UpdateDateModals/UpdateDateAssignment";
import DeleteAssignment from "./DeleteModals/DeleteAssignment";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  // update status functionality
  const [openStatusModal, setOpenStatusModal] = useState(false);
  //update date functionality
  const [openDateModal, setOpenDateModal] = useState(false);
  // delete functionality
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  console.log("current length", caaLength);

  return (
    <div>
      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={refreshButtonClick}
      >
        Refresh Assignments
      </button>
      {ooaLength >= 1 && (
        <div className="overdue-container">
          <h4>Overdue Assignments!</h4>
          {overdueAssignmentsArray.map((assignment, index) => (
            <div
              key={index}
              className=
              //"fake-card"
              "card bg-light mb-3 item-card"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <div className="card-heading">
                  <h5 className="card-title">{assignment.assignment_title}</h5>
                  <div className="inline-buttons">
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setAssignmentId(assignment.id);
                        setAssignmentTitle(assignment.assignment_title);
                      }}
                    >
                      Delete
                    </button>

                    {openDeleteModal ? (
                      <DeleteAssignment
                        closeDeleteModal={() => setOpenDeleteModal(false)}
                        assignmentId={assignmentId}
                        assignmentTitle={assignmentTitle}
                      />
                    ) : null}
                  </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                  Due date: {assignment.assignment_due_date}
                </h6>
                <p>{assignment.assignment_desc}</p>
                <p>Author: {assignment.author}</p>
                <p>
                  Status:
                  {assignment.assignment_status ? "Complete" : "Incomplete"}
                </p>{" "}
                <div className="card-buttons">
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {caaLength >= 1 && (
        <div className="current-container">
          <h4>Current Assignments</h4>
          {currentAssignmentsArray.map((assignment, index) => (
            <div class="card bg-light mb-3 item-card" style={{ width: "18rem" }}>
              <div class="card-body">
                <div className="card-heading">
                  <h5 class="card-title">{assignment.assignment_title}</h5>
                  <div className="inline-buttons">

                  <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setAssignmentId(assignment.id);
                        setAssignmentTitle(assignment.assignment_title);
                      }}
                    >
                      Delete
                    </button>

                    {openDeleteModal ? (
                      <DeleteAssignment
                        closeDeleteModal={() => setOpenDeleteModal(false)}
                        assignmentId={assignmentId}
                        assignmentTitle={assignmentTitle}
                      />
                    ) : null}
                  </div>

                </div>

                <h6 class="card-subtitle mb-2 text-muted">
                  Due date: {assignment.assignment_due_date}
                </h6>
                <p>{assignment.assignment_desc}</p>
                <p>Author: {assignment.author}</p>
                <p>
                  Status:
                  {assignment.assignment_status ? "Complete" : "Incomplete"}
                </p>

                <div className="card-buttons">
                    <button
                      type="button"
                      className="btn btn-info update-btn"
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
                    <button
                      type="button"
                      className="btn btn-info update-btn"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {paaLength >= 1 && (
        <div className="past-container">
          <h4>Completed Assignments</h4>
          {pastAssignmentsArray.map((assignment, index) => (
            <div
              key={index}
              className="card bg-light mb-3 item-card"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <div className="card-heading">
                  <h5 className="card-title">{assignment.assignment_title}</h5>
                  <div className="inline-buttons">
                  <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setAssignmentId(assignment.id);
                        setAssignmentTitle(assignment.assignment_title);
                      }}
                    >
                      Delete
                    </button>

                    {openDeleteModal ? (
                      <DeleteAssignment
                        closeDeleteModal={() => setOpenDeleteModal(false)}
                        assignmentId={assignmentId}
                        assignmentTitle={assignmentTitle}
                      />
                    ) : null}
                  </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                  Due date: {assignment.assignment_due_date}
                </h6>
                <p>{assignment.assignment_desc}</p>
                <p>Author: {assignment.author}</p>
                <p>
                  Status:
                  {assignment.assignment_status ? "Complete" : "Incomplete"}
                </p>
                <div className="card-buttons">
                    <button
                      type="button"
                      className="btn btn-info update-btn"
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
                    <button
                      type="button"
                      className="btn btn-info update-btn"
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
                  <p>
 
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ViewAssignments;
