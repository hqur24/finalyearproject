import React, { useState, useEffect } from "react";

const AddAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    assignment_title: "",
    assignment_desc: "",
    assignment_due_date: "",
    assignment_status: "false",
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

    setAssignmentData({
      ...assignmentData,
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

    setAssignmentData({
      ...assignmentData,
      assignment_due_date: event.target.value,
    });

  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    const data = {
      ...assignmentData,
      author: user,
    };

    console.log("author should be set to", user)

    const response = await fetch("http://localhost:8000/api/assignments/", {
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
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label class="col-4 col-form-label" for="assignment_title">
            Assignment Title
          </label>
          <div class="col-8">
            <input
              id="assignment_title"
              name="assignment_title"
              type="text"
              class="form-control"
              required="required"
              value={assignmentData.assignment_title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="assignment_desc" class="col-4 col-form-label">
            Assignment Description
          </label>
          <div class="col-8">
            <textarea
              id="assignment_desc"
              name="assignment_desc"
              cols="40"
              rows="6"
              class="form-control"
              required="required"
              value={assignmentData.assignment_desc}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="assignment_due_date" class="col-4 col-form-label">
            Due Date
          </label>
          <div class="col-8">
            <input
              type="date"
              name="assignment_due_date"
              class="form-control"
              id="date_picker_field"
              value={assignmentData.assignment_due_date}
              onChange={handleDateChange}
            />
            <small id="helpText" class="form-text text-muted">
              Please only enter a future date.
            </small>
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
  );
};

export default AddAssignment;
