import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const PointSystem = () => {
  const [userId, setUserId] = useState();

  const [points, setPoints] = useState("");
  const [levelNumber, setLevelNumber] = useState("");
  const [levelName, setLevelName] = useState("");
  const [awayPoints, setAwayPoints] = useState("");

  const [showPoints, setShowPoints] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
      const fetchCurrentUser = () => {
        fetch(`${API_URL}/accounts/currentuser/`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Cannot get current user!");
          }
        })
        .then((data) => {
          setUserId(data.id);
          getValues(data.id);
        })
        .catch((error) => {
          // setUserId(0);
          setErrorMsg(error.message);
          setShowPoints(3);
        });
      };

    fetchCurrentUser();
  }, []);

  const getValues = () => {
    fetch(`${API_URL}/items/point_system/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        const { points, level, away } = data;
        setPoints(points);
        setLevelNumber(level);
        setAwayPoints(away);
        calculateLevel(level);
        setShowPoints(2);
      });
  };

  useEffect(() => {
    calculateLevel(levelNumber);
  }, [levelNumber, levelName]);

  const calculateLevel = (level) => {
    let levelName = "";
    if (level === 1) {
      levelName = "Bronze";
    } else if (level === 2) {
      levelName = "Silver";
    } else if (level === 3) {
      levelName = "Gold";
    } else if (level === 4) {
      levelName = "Platinum";
    } else if (level === 5) {
      levelName = "Diamond";
    }
    setLevelName(levelName);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info analysis-btn"
        onClick={getValues}
      >
        Get Current Points
      </button>
      {showPoints === 1 && <p>Click the button to see your points!</p>}
      {showPoints === 2 && (
        <div>
          <h5> Current Points: </h5>
          <h3>{points}</h3>
          <h5> Current Level: </h5>
          <h3>
            {levelName} <div style={{display:"inline", fontSize:"75%"}}>(Level {levelNumber})</div>
          </h3>
          <p style={{ fontWeight: "bold" }}>
            You are currently{" "}
            <div style={{ fontSize: "130%", display: "inline" }}>
              {awayPoints}
            </div>{" "}
            points away from the next level. Keep using the platform and adding
            items to increase your points and level.{" "}
          </p>
          <p style={{ fontStyle: "italic" }}>
            Remember - mood entries account for more points than the others, so
            don't forget to add them!
          </p>
        </div>
      )}
      {showPoints === 3 && <p>{errorMsg}</p>}
      <hr></hr>
    </div>
  );
};

export default PointSystem;
