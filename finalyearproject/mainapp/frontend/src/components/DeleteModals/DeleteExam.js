import React, { useState } from "react";
import axios from "axios";
import "./DeleteModals.css";
const API_URL = process.env.REACT_APP_API_URL;

const DeleteExam = ({
  closeDeleteModal,
  examId,
  examName,
}) => {
  const csrftoken = getCookie("csrftoken");
  const [responseMessage, setResponseMessage] = useState(null);

  const handleDelete = () => {

       axios
        .delete(
          // `http://127.0.0.1:8000/api/exams/${examId}/`,
          `${API_URL}/items/exams/${examId}/`,
          {
            headers: {
              "X-CSRFToken": csrftoken,
            },
          }
        )
        .then((response) => {
          closeDeleteModal();
        })
        .catch((error) => {
          console.log(error);
          setResponseMessage("There was an error whilst trying to delete this entry. Please try again later. ")
        });
    }
  

  return (
    <div className="delete-popup-container">
      <div className="delete-popup-body">
        <button className="btn delete-close-button" onClick={closeDeleteModal}>
          X
        </button>
        <br></br>

        <h5>
          Deleting entry:{" "}
          <strong>
            {examName}  (ID={examId}){" "}
          </strong>
        </h5>
        <p>
            Are you sure you want to delete this exam. 
        </p>
        <p>
          
          <br></br>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Yes, delete this entry.
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
export default DeleteExam;