import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PointSystem from "../components/PointSystem";
const API_URL = process.env.REACT_APP_API_URL;

const Points = () => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState()
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(`${API_URL}/accounts/currentuser/`);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUserId(1)
        console.log("Error fetching current user");
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <div className="container-itempage">
      <div class="row">
        <div class="col-12">
            <div className="points-hub">
              <h3>Points Hub!</h3>
              <hr></hr>
              <PointSystem userId={userId}></PointSystem>
                <h6
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  How are points calculated?
                </h6>
              <p>
                Points are calculated using our formula which applies weighting
                to each of the items. The number of points is dependent on the
                number of items that are in the system, essentially, it is a
                measure of how active you are on the site.
              </p>
              <div className="formula-bg">
              <p>The formula we use is as follows:</p>
              <h6> Points = (A x 0.5) + (E x 0.5) + (P x 0.5) + (M x 0.7) </h6>
              <ul>
                <li>
                  where A = number of assignments (past, present, and overdue)
                </li>
                <li>
                  where E = number of exams (past, present)
                </li>
                <li>
                  where P = number of applications (past, present, and overdue)
                </li>
                <li>
                  where M = number of moods
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Points;
