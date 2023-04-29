import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import FormatDate from "./FormatDate.js";
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const MoodAnalysis = () => {
  const [totalEntries, setTotalEntries] = useState("");

  const [occurrences, setOccurrences] = useState({});
  const [showBarGraph, setShowBarGraph] = useState(false);
  const [responseMessageBar, setResponseMessageBar] = useState(false);

  const [dates, setDates] = useState({});
  const [responseMessageDates, setResponseMessageDates] = useState(false);
  const [showFacts, setShowFacts] = useState(1);

  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(
        `${API_URL}/accounts/currentuser/`
      );

      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);
      } else {
        setUserId(0);
      }
    };

    fetchCurrentUser();
  }, []);

  const getOccurrences = () => {
    fetch(`${API_URL}/items/mood_analysis/${userId}/`)
    //fetch(`${API_URL}/items/mood_analysis/1/`)

    // fetch(`http://127.0.0.1:8000/items/mood_analysis/1/`)
      .then((response) => response.json())
      .then((data) => {
        const { occurrences } = data;
        const totalEntries = Object.values(occurrences).reduce(
          (acc, value) => acc + value,
          0
        );
        setTotalEntries(totalEntries);
        if (totalEntries < 5) {
          setResponseMessageBar(
            "Not enough data to generate a graph. Please add at least 5 entries, and then try again."
          );
          setShowBarGraph(false);
        } else {
          setResponseMessageBar("");
          setOccurrences(occurrences);
          setShowBarGraph(true);
        }
      });
  };

  const getDates = () => {
   fetch(`${API_URL}/items/mood_analysis/${userId}/`)
    //fetch(`${API_URL}/items/mood_analysis/1/`)

    // fetch(`http://127.0.0.1:8000/items/mood_analysis/1/`)
      .then((response) => response.json())
      .then((data) => {
        const { dates } = data;
        if (dates == null) {
          setResponseMessageDates(
            "Not enough data to generate facts. Please add at least 2 entries, and then try again."
          );
          setShowFacts(2);
        } else {
          setResponseMessageDates("");
          setDates(dates);
          setShowFacts(3);
        }
      });
  };

  return (
    <div>
      <hr></hr>

      <h5>Mood Analysis</h5>
      <button type="button" className="btn btn-info" onClick={getDates}>
        Generate Quick Facts
      </button>
      {showFacts === 3 && dates ? (
        <div className="mood-facts-note">
         <h5>Quick Mood Facts</h5>
          <p>
            {" "}
            <strong>First Entry:</strong>{" "}
            <FormatDate dateString={Object.values(dates)[0]["mood_date"]} /> (
            {Object.values(dates)[0]["mood_choice"]})
          </p>
          <p>
            {" "}
            <strong>Latest Entry:</strong>{" "}
            <FormatDate dateString={Object.values(dates)[1]["mood_date"]} /> (
            {Object.values(dates)[1]["mood_choice"]})
          </p>
        </div>
      ) : showFacts === 2 ? (
        <div className="mood-facts-note">
          <h5>Error!</h5>
          <h6> {responseMessageDates}</h6>
        </div>
      ) : null}

      <button type="button" className="btn btn-info" onClick={getOccurrences}>
        Generate Bar Chart
      </button>
      <p className="error-text">{responseMessageBar}</p>
      {showBarGraph && (
        <Plot
          data={[
            {
              x: Object.keys(occurrences),
              y: Object.values(occurrences),
              type: "bar",
              marker: {
                color: [
                  "cadetblue",
                  "rosybrown",
                  "darkseagreen",
                  "peachpuff",
                  "thistle",
                  "lemonchiffon",
                ],
              },
              text: Object.values(occurrences),
              textposition: "auto",
            },
          ]}
          layout={{
            title: "Mood Occurrences (all time)",
            xaxis: {
              title: "Mood Choice",
            },
            yaxis: {
              title: "Number of occurrences",
            },
          }}
        />
      )}
    </div>
  );
};

export default MoodAnalysis;
