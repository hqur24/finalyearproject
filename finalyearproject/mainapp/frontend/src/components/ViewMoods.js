import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteMood from "./DeleteModals/DeleteMood";

const ViewMoods = () => {
  const [moods, setMoods] = useState([]);
  const [refreshButton, setRefreshButton] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [moodId, setMoodId] = useState();
  const [moodChoice, setMoodChoice] = useState();
  const [moodDate, setMoodDate] = useState();


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/items/moods/")
      .then((response) => {
        const moods = response.data.moods;
        setMoods(moods);
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
      {moods.map((mood, index) => (
        <div class="card bg-light mb-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">
              {mood.mood_date}: {mood.mood_choice}
            </h5>
            <p>Author: {mood.author}</p>
            <p>
              <button
                type="button"
                className="btn btn-danger"
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
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewMoods;
