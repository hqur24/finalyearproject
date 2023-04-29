import React, { useState } from "react";
import axios from "axios";
import "./UpdateModals.css";

const UpdateDateExam = ({ closeUpdateModal, examId, examName, previousExamDate}) => {
  const csrftoken = getCookie("csrftoken");
  const [examDate, setExamDate] = useState("false");
  const [responseMessage, setResponseMessage] = useState(null)

  const handleSubmitDate = () => {
    console.log("previously", previousExamDate)
    console.log("now submitting", examDate)

    if (previousExamDate === examDate) {
      setResponseMessage(`You cannot set this as ${examDate} because it already has this date.`)
    }
    else {
         axios
        // .patch(`http://127.0.0.1:8000/api/exams/${examId}/`, {
          .patch(`http://127.0.0.1:8000/items/exams/${examId}/`, {
          exam_date: examDate,
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
    <div className="update-popup-container">
      <div className="update-popup-body">
        <button className="btn update-close-button" onClick={closeUpdateModal}>
          X
        </button>
        <br></br>

        <h5>
          Updating Exam Date for:{" "}
          <strong>
            {examName} (ID={examId}){" "}
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
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
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
export default UpdateDateExam;
