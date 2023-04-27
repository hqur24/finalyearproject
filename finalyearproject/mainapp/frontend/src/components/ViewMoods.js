import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteMood from "./DeleteModals/DeleteMood";
import FormatDate from "./FormatDate";

const ViewMoods = () => {
  const [moods, setMoods] = useState([]);
  const [refreshButton, setRefreshButton] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [moodId, setMoodId] = useState();
  const [moodChoice, setMoodChoice] = useState();
  const [moodDate, setMoodDate] = useState();
  const [totalMoods, setTotalMoods] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/items/moods/")
      .then((response) => {
        const moods = response.data.moods;
        setMoods(moods);
        setTotalMoods(moods.length);
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
        Refresh Moods
      </button>
      <h6>All Moods ({totalMoods})</h6>
      <div className="card-row">
        {moods.map((mood, index) => (
          <div class="card bg-light mb-3 mood-card" style={{ width: "18rem" }}>
            <div class="card-body">
              <div className="card-heading">
                <h5 class="card-title">
                  <FormatDate dateString={mood.mood_date} />{" "}
                </h5>
                <div className="inline-buttons">
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setMoodId(mood.id);
                      setMoodChoice(mood.mood_choice);
                      setMoodDate(mood.mood_date);
                    }}
                  >
                    Delete
                  </button>

                  {openDeleteModal ? (
                    <DeleteMood
                      closeDeleteModal={() => setOpenDeleteModal(false)}
                      moodId={moodId}
                      moodChoice={moodChoice}
                      moodDate={moodDate}
                    />
                  ) : null}
                </div>
              </div>
              <h4>{mood.mood_choice}</h4>

              <p>Author: {mood.author}</p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
      <h6>Mood Analysis</h6>
      <p>Mood Analysis function to go here</p>
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
export default ViewMoods;
