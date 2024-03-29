
import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const AddMood = () => {
  const [moodData, setMoodData] = useState({
    mood_choice: "",
    mood_date: "",
    author: "",
  });

  const csrftoken = getCookie("csrftoken");
  const [user, setUser] = useState("");
  const [submitResponseMessage, setSubmitResponseMessage] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(`${API_URL}/accounts/currentuser/`);
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.id);
      } else {
        console.log("Error fetching current user");
      }
    };
  
    fetchCurrentUser();
  }, []);

  const handleChange = (event) => {
   
    const { name, value } = event.target;
  
    setMoodData({
      ...moodData,
      [name]: value,
    });
  };

  const handleDateChange = (event) => {
    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };
    Date.prototype.addMinutes = function (m) {
      this.setTime(this.getTime() + m * 60 * 1000);
      return this;
    };

    let date = new Date(event.target.value);
    const sevenDayCheck = new Date().addHours(-168);
    date = date.addMinutes(59);
    const todayDate = new Date();

    if (date > todayDate) {
      event.target.setCustomValidity(
        "Please do not choose a date in the future."
      );
    } else if (date <= sevenDayCheck) {
      event.target.setCustomValidity(
        "Please do not choose a date more than 7 days in the past."
      );
    } else {
      event.target.setCustomValidity("");
    }
    setMoodData({
      ...moodData,
      mood_date: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      ...moodData,
      author: user,
    };

    const response = await fetch(`${API_URL}/items/moods/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSubmitResponseMessage("Mood succesfully added! Click the refresh button to view your changes.")
    }
    else if (response.status === 409) {
        setSubmitResponseMessage("A mood entry for this user and date already exists. Please try again.");

    } else {
      setSubmitResponseMessage("Error occured when adding your mood entry. Please try again.")
    }
  };
  return (
    <div>
      <h5>Log your Mood</h5>
        <form onSubmit={handleSubmit}>
          <div class="form-group row">
            <label for="exam_type" class="col-4 col-form-label">
              Mood Date
            </label>
            <div class="col-8">
              <input
                type="date"
                name="mood_date"
                class="form-control"
                id="date_picker_field"
                value={moodData.mood_date}
                required="required"
                onChange={handleDateChange}
              />
              <small id="helpText" class="form-text text-muted">
                You can only choose today's date or a date within the past 7
                days.
              </small>
            </div>
          </div>
          <div class="form-group row">
            <label for="exam_type" class="col-4 col-form-label">
              Mood Choice
            </label>
            <div class="col-8">
              <select
                id="mood_choice"
                name="mood_choice"
                class="custom-select"
                value={moodData.mood_choice}
                required="required"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select mood choice
                </option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
                <option value="Excited">Excited</option>
                <option value="Tired">Tired</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-4 col-8">
              <button name="submit" type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
            {submitResponseMessage}
          </div>
        </form>
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
export default AddMood;
