import React, { useState } from "react";
import axios from "axios";
import "./DeleteModals.css";
import FormatDate from "../FormatDate";
const API_URL = process.env.REACT_APP_API_URL;

const DeleteMood = ({ closeDeleteModal, moodId, moodChoice, moodDate }) => {
  const csrftoken = getCookie("csrftoken");
  const [responseMessage, setResponseMessage] = useState(null);

  const handleDelete = () => {
    axios
      // .delete(`http://127.0.0.1:8000/api/moods/${moodId}/`, {
        .delete(`${API_URL}/items/moods/${moodId}/`, {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      })
      .then((response) => {
        console.log(response);
        closeDeleteModal();
      })
      .catch((error) => {
        console.log(error);
        setResponseMessage(
          "There was an error whilst trying to delete this entry. Please try again later. "
        );
      });
  };

  return (
    <div className="delete-popup-container">
      <div className="delete-popup-body">
        <button className="btn delete-close-button" onClick={closeDeleteModal}>
          X
        </button>
        <br></br>

        <h5>
          Deleting entry: <strong>{moodChoice} </strong> from{" "}
          <strong>
            {" "}
            <FormatDate dateString={moodDate}></FormatDate>(ID={moodId}){" "}
          </strong>
        </h5>
        <p>
          Are you sure you want to delete this mood? Please be aware that if
          this entry is more than 7 days in the past you will not be able to
          resubmit an updated mood.
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
export default DeleteMood;
