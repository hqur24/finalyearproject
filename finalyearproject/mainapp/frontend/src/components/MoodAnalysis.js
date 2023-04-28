import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const MoodAnalysis = () => {
  const [occurrences, setOccurrences] = useState({});
  const [showBarGraph, setShowBarGraph] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("http://127.0.0.1:8000/accounts/currentuser/");
  
      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);
        console.log("setting user:", data.username, data.id)
      } else {
        console.log("Error fetching current user FOR ANALYSIS");
        setUserId(0)
      }
    };
  
    fetchCurrentUser();
  }, []);

  const getOccurrences = () => {
      
    fetch(`http://127.0.0.1:8000/items/mood_analysis/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        const { occurrences } = data;
        const totalEntries = Object.values(occurrences).reduce(
          (acc, value) => acc + value,
          0
        );
        if (totalEntries < 5) {
          setResponseMessage(
            "No mood data to generate a graph. Please add at least 5 entries."
          );
          setShowBarGraph(false);
        } else {
          setResponseMessage("");
          setOccurrences(occurrences);
          setShowBarGraph(true);
        }
      });
  };

  return (
    <div>
              <hr></hr>

      <h5>Mood Analysis</h5>
      <button type="button" className="btn btn-info" onClick={getOccurrences}>
        Generate Bar Chart
      </button>
      <p className="error-text">{responseMessage}</p>
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
