import React, {useState } from "react";
import axios from "axios";
import "./UpdateModals.css";
const API_URL = process.env.REACT_APP_API_URL;

const UpdateDateAssignment = ({ closeUpdateModal, assignmentId, assignmentTitle, previousAssignmentDueDate }) => {
  const csrftoken = getCookie("csrftoken");
  const [assignmentDueDate, setAssignmentDueDate] = useState("false");
  const [responseMessage, setResponseMessage] = useState(null)

  const handleSubmitDate = () => {

    if (previousAssignmentDueDate === assignmentDueDate) {
      setResponseMessage(`You cannot set this as ${assignmentDueDate} //{assignmentDate === "true" ? "Complete" : "Not Completed"} because it already has this status.`)
    }
    else {
         axios
        // .patch(`http://127.0.0.1:8000/api/assignments/${assignmentId}/`, {
          .patch(`${API_URL}/items/assignments/${assignmentId}/`, {
          assignment_due_date: assignmentDueDate,
        }, {
          headers: {
            'X-CSRFToken': csrftoken
          }
        })
        .then((response) => {
          closeUpdateModal();
        })
        .catch((error) => {
          console.log(error);
        });   
    }

  }

  return (
    <div className="update-popup-container">
      <div className="update-popup-body">
        <button className="btn update-close-button" onClick={closeUpdateModal}>
          X
        </button>
        <br></br>

        <h5>
          Updating Due Date for:{" "}
          <strong>
            {assignmentTitle} (ID={assignmentId}){" "}
          </strong>
        </h5>
        <p>
          <div class="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              name="assignment_due_date"
              class="form-control"
              id="date_picker_field"
              value={assignmentDueDate}
              onChange={(e) => setAssignmentDueDate(e.target.value)}
            />
          </div>
          <br></br>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmitDate}
          >
            Submit
          </button>
        </p>
        {responseMessage}
      </div>
    </div>
  );
};
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
export default UpdateDateAssignment;
