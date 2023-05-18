import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import FormatDate from "./FormatDate.js";
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const MoodAnalysis = () => {
  const [totalEntries, setTotalEntries] = useState("");

  const [occurrences, setOccurrences] = useState({});
  const [showBarGraph, setShowBarGraph] = useState(false);
  const [responseMessageBar, setResponseMessageBar] = useState(false);

  const [showPieChart, setShowPieChart] = useState(false);

  const [dates, setDates] = useState({});
  const [responseMessageDates, setResponseMessageDates] = useState(false);
  const [showFacts, setShowFacts] = useState(1);

  const [weekdays, setWeekdays] = useState({});
  const [happyDays, setHappyDays] = useState({});

  const [timeCounts, setTimeCounts] = useState({});
  const [showLinePlot, setShowLinePlot] = useState(false);
  const [responseMessageTime, setResponseMessageTime] = useState(false);

  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(`${API_URL}/accounts/currentuser/`);

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
    //fetch(`${API_URL}/items/mood_analysis/8/`)
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
            "Not enough data to generate a chart. Please add at least 5 entries, and then try again."
          );
          setShowBarGraph(false);
        } else {
          setResponseMessageBar("");
          setOccurrences(occurrences);
          setShowBarGraph(true);
        }
      });
  };

  const getOccurrencesPie = () => {
    fetch(`${API_URL}/items/mood_analysis/${userId}/`)
    //fetch(`${API_URL}/items/mood_analysis/8/`)
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
            "Not enough data to generate a chart. Please add at least 5 entries, and then try again."
          );
          setShowPieChart(false);
        } else {
          setResponseMessageBar("");
          setOccurrences(occurrences);
          setShowPieChart(true);
        }
      });
  };

  const getDates = () => {
    fetch(`${API_URL}/items/mood_analysis/${userId}/`)
    //fetch(`${API_URL}/items/mood_analysis/8/`)
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

  const getWeekdays = () => {
    fetch(`${API_URL}/items/mood_analysis/${userId}/`)
    //fetch(`${API_URL}/items/mood_analysis/8/`)
      .then((response) => response.json())
      .then((data) => {
        const { weekdays } = data;
        const { happy } = data;
        console.log(happy);
        if (weekdays == null) {
          setResponseMessageDates(
            "Not enough data to generate facts. Please add at least 2 entries, and then try again."
          );
          setShowFacts(2);
        } else {
          setResponseMessageDates("");
          setWeekdays(weekdays);
          setHappyDays(happy);
          setShowFacts(3);
        }
      });
  };

  const getTimeCounts = () => {
    fetch(`${API_URL}/items/mood_analysis/${userId}/`)
    //fetch(`${API_URL}/items/mood_analysis/1/`)
      .then((response) => response.json())
      .then((data) => {
        const { timeCounts } = data;
        console.log(timeCounts);
        if (timeCounts == null) {
          setResponseMessageTime("Not enough data to generate time analysis.");
          setShowLinePlot(false);
        } else {
          setResponseMessageTime("");
          setTimeCounts(timeCounts);
          setShowLinePlot(true);

        }
      });
  };

  return (
    <div className="container">
      <hr></hr>

      <h5>Mood Analysis</h5>
      <div>
        <button
          type="button"
          className="btn btn-info analysis-btn"
          onClick={() => {
            getDates();
            getWeekdays();
          }}
        >
          Generate Quick Facts
        </button>
        <br></br>
        {showFacts === 3 && dates ? (
          <div className="mood-facts-note">
            <h4>Quick Mood Facts</h4>
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
            <p>
              {" "}
              You have added the most entries on a:{" "}
              <strong>
                <p style={{ fontSize: "110%" }}>{Object.keys(weekdays)[0]}</p>
              </strong>{" "}
            </p>
            <p>
              {" "}
              Your happiest day of the week is:{" "}
              <strong>
                <p style={{ fontSize: "110%" }}>{Object.keys(happyDays)[0]}</p>
              </strong>{" "}
            </p>
          </div>
        ) : showFacts === 2 ? (
          <div className="mood-facts-note">
            <h5>Error!</h5>
            <h6> {responseMessageDates}</h6>
          </div>
        ) : null}

        <button
          type="button"
          className="btn btn-info analysis-btn"
          onClick={getOccurrences}
        >
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
        <div>
        <button
          type="button"
          className="btn btn-info analysis-btn"
          onClick={getOccurrencesPie}
        >
          Generate Pie Chart
        </button>
        <p className="error-text">{responseMessageBar}</p>
        {showPieChart && (
          <Plot
            data={[
              {
                labels: Object.keys(occurrences),
                values: Object.values(occurrences),
                type: "pie",
                marker: {
                  colors: [
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
              title: "Proportion of Mood Choices",
            }}
          />
        )}
        </div>
        <div>
        <button
          type="button"
          className="btn btn-info analysis-btn"
          onClick={getTimeCounts}
        >
          Generate Time Chart
        </button>
        <p className="error-text">{responseMessageTime}</p>

        {showLinePlot && (

          <Plot
            data={[
              {
                x: Object.values(timeCounts).map((entry) => entry["Week Ending"]),
                y: Object.values(timeCounts).map((entry) => entry["Count"]),
                type: "line",
                marker: {
                  line: {
                    color: "mediumvioletred",
                  },                },
                text: Object.values(occurrences),
                textposition: "auto",
              },
            ]}
            layout={{
              title: "Entries by week",
              xaxis: {
                title: "Week Ending",
              },
              yaxis: {
                title: "Entries",
              },
            }}
          />
        )}      </div>
      </div>
    </div>
  );
};

export default MoodAnalysis;
