import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";
const API_URL = process.env.REACT_APP_API_URL;

const DashboardMoods = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items/moods/`)
      .then((response) => {
        const moods = response.data.moods;
        setMoods(moods);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <p>
        Showing 4 most recent entries. To view more, please go to the Mood
        Tracker page.
      </p>
      <hr></hr>
      {moods.slice(0, 4).map((mood, index) => (
        <div
          className={`card mb-3 mood-card ${
            mood.mood_choice === "Happy"
              ? "bg-happy"
              : mood.mood_choice === "Sad"
              ? "bg-sad"
              : mood.mood_choice === "Excited"
              ? "bg-excited"
              : mood.mood_choice === "Tired"
              ? "bg-tired"
              : mood.mood_choice === "Angry"
              ? "bg-angry"
              : "bg-light"
            // : "bg-light"
          }`}
          style={{ minWidth: "60%", maxWidth: "85%" }}
        >
          <div class="card-body">
            <h6 class="card-title">
              {" "}
              <FormatDate dateString={mood.mood_date} />
              {}
            </h6>
            <h5>{mood.mood_choice}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMoods;
