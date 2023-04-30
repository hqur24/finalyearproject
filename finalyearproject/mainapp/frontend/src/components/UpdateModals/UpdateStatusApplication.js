import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "./UpdateModals.css";
const API_URL = process.env.REACT_APP_API_URL;

const UpdateStatusApplication = ({ closeUpdateModal, applicationId, applicationCompany, previousApplicationStatus }) => {
  const csrftoken = getCookie("csrftoken");
  const [applicationStatus, setApplicationStatus] = useState("false");
  const [responseMessage, setResponseMessage] = useState(null)

  const handleSubmitStatus = () => {
    console.log("previously", previousApplicationStatus)
    console.log("now submitting NON BOOLEAN", applicationStatus)
    console.log("now submitting  BOOLEAN", applicationStatus === "true")

    if (previousApplicationStatus === (applicationStatus === "true")) {
      setResponseMessage(`You cannot set this as ${applicationStatus === "true" ? "a past application" : "a Current application"} because it already has this status.`)
    }
    else {
         axios
        // .patch(`http://127.0.0.1:8000/api/applications/${applicationId}/`, {
          .patch(`${API_URL}/items/applications/${applicationId}/`, {
          application_status: applicationStatus === "true",
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
          Updating Status for:{" "}
          <strong>
            {applicationCompany} (ID={applicationId}){" "}
          </strong>
        </h5>
        <p>
          <div className="form-group">
            <label>Status:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              value={applicationStatus}
              onChange={(e) => setApplicationStatus(e.target.value)}
            >
              <option value="false">Not Completed</option>
              <option value="true">Completed</option>
            </select>
          </div>
          <br></br>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmitStatus}
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
export default UpdateStatusApplication;