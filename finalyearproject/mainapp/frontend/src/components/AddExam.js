import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL || 'http://hqur24.pythonanywhere.com';

const AddExam = () => {
  const [examData, setExamData] = useState({
    exam_name: "",
    exam_date: "",
    exam_type: "",
    exam_status: "false",
    author: "",
  });

  const csrftoken = getCookie("csrftoken");
  const [user, setUser] = useState("")
  const [submitResponseMessage, setSubmitResponseMessage] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(`${API_URL}/accounts/currentuser/`);
  
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

    setExamData({
      ...examData,
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

    let date = new Date(event.target.value).addHours(22);
    date = date.addMinutes(59);
    const todayDate = new Date();

    if (date <= todayDate) {
      event.target.setCustomValidity(
        "Please do not choose a due date in the past."
      );
    } else {
      event.target.setCustomValidity("");
    }
    setExamData({
      ...examData,
      exam_date: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      ...examData,
      author: user,
    };

    console.log("author should be set to", user)

    const response = await fetch(`${API_URL}/items/exams/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("successsssss");
      setSubmitResponseMessage("Exam succesfully added! Click the refresh button to view your changes.")
    } else {
      console.log("failureeeeeeee");
      setSubmitResponseMessage("Error while adding exam. Please try again.")
    }
  };

  return (
    <div>
      <h5>Add Exam</h5>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label class="col-4 col-form-label" for="exam_name">
            Exam
          </label>
          <div class="col-8">
            <input
              id="exam_name"
              name="exam_name"
              type="text"
              class="form-control"
              required="required"
              value={examData.exam_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="exam_type" class="col-4 col-form-label">
            Exam Date
          </label>
          <div class="col-8">
            <input
              type="date"
              name="exam_date"
              class="form-control"
              id="date_picker_field"
              value={examData.exam_date}
              onChange={handleDateChange}
            />
            <small id="helpText" class="form-text text-muted">
              Please only enter future date.
            </small>
          </div>
        </div>
        <div class="form-group row">
          <label for="exam_type" class="col-4 col-form-label">
            Exam Type
          </label>
          <div class="col-8">
            <select
              id="exam_type"
              name="exam_type"
              class="custom-select"
              value={examData.exam_type}
              required="required"
              onChange={handleChange}
            >
              <option value="" disabled>
                Select exam type
              </option>

              <option value="Final">Final</option>
              <option value="Midterm">Midterm</option>
              <option value="Termtime">Termtime Exam</option>
              <option value="Quiz">Quiz/MCQ</option>
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
export default AddExam;
