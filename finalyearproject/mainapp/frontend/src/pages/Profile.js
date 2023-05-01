import React, { Fragment, useState, useEffect } from "react";
import { Form, Link, NavLink, useLocation } from "react-router-dom";
import PointSystem from "../components/PointSystem";
import FormatDate from "../components/FormatDate";

const API_URL = process.env.REACT_APP_API_URL;
const Profile = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(`${API_URL}/accounts/currentuserextra/`);

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log("Error fetching current user");
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="container-itempage">
      <div class="row">
        <div class="col-12">
          <div className="pages-container-items">
            <div class="row title-text">
              <h3>{user.username}'s Profile</h3>
            </div>
            <hr></hr>
            <h5 style={{display:"inline-block"}}>Username: <h6 style={{display:"inline"}}> {user.username}</h6></h5>
            <br></br>
            <h5 style={{display:"inline"}}>Email: <h6 style={{display:"inline"}}> {user.email}</h6></h5>
            <hr></hr>
            <h5 style={{display:"inline"}}>Date Joined: <h6 style={{display:"inline"}}> <FormatDate dateString={user.date_created}/></h6></h5>
            <br></br>
            {/* <h5 style={{display:"inline"}}>Days as a member:<h6 style={{display:"inline"}}> {user.date_created}</h6></h5> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
