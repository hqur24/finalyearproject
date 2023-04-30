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
          class="card bg-light mb-3 dashboard-card"
          style={{ width: "18rem" }}
        >
          <div class="card-body">
            <h6 class="card-title">
              {" "}
              <FormatDate dateString={mood.mood_date} />
              {}
            </h6>
            <h5>{mood.mood_choice}</h5>
            <p>Author: {mood.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMoods;
