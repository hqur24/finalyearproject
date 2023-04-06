import React, { useState, useEffect } from "react";
const AddMood = () => {
  const [moodData, setMoodData] = useState({
    mood_choice: "",
    mood_date: "",
    author: "",
  });

  const [user, setUser] = useState("")
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("http://127.0.0.1:8000/accounts/currentuser/");
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.id);
        console.log("setting user:", data.username, data.id)
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
    console.log("seven day:", sevenDayCheck);
    console.log("today:", todayDate);

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

    console.log("author should be set to", user)

    const response = await fetch("http://localhost:8000/api/moods/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("successsssss");
    } else {
      console.log("failureeeeeeee");
    }
  };
  return (
    <div>
      <div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMood;
