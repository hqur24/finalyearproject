import React, {useState } from "react";
import axios from "axios";
import "./UpdateDateModals.css";

const UpdateDateAssignment = ({ closeUpdateModal, assignmentId, assignmentTitle, previousAssignmentDueDate }) => {
  const csrftoken = getCookie("csrftoken");
  const [assignmentDueDate, setAssignmentDueDate] = useState("false");
  const [responseMessage, setResponseMessage] = useState(null)

  const handleSubmitDate = () => {
    console.log("previously", previousAssignmentDueDate)
    console.log("now submitting NON BOOLEAN", assignmentDueDate)
    //console.log("now submitting  BOOLEAN", assignmentStatus === "true")

    if (previousAssignmentDueDate === assignmentDueDate) {
      setResponseMessage(`You cannot set this as ${assignmentDueDate} //{assignmentDate === "true" ? "Complete" : "Not Completed"} because it already has this status.`)
    }
    else {
         axios
        .patch(`http://127.0.0.1:8000/api/assignments/${assignmentId}/`, {
          assignment_due_date: assignmentDueDate,
        }, {
          headers: {
            'X-CSRFToken': csrftoken
          }
        })
        .then((response) => {
          console.log(response);
          closeUpdateModal();
        })
        .catch((error) => {
          console.log(error);
        });   
    }

  }

  return (
    <div className="popup-container">
      <div className="popup-body">
        <button className="btn close-button" onClick={closeUpdateModal}>
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
