import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const AddApplication = () => {
    const [applicationData, setApplicationData] = useState({
        application_company: "",
        application_deadline: "",
        application_type: "",
        application_notes: "",
        application_status: "false",
        author: "",
      });

      const csrftoken = getCookie("csrftoken");
      const [user, setUser] = useState("")
      const [submitResponseMessage, setSubmitResponseMessage] = useState(null);

      useEffect(() => {
        const fetchCurrentUser = async () => {
          // const response = await fetch("http://127.0.0.1:8000/accounts/currentuser/");
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
    
        setApplicationData({
          ...applicationData,
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
    
        setApplicationData({
          ...applicationData,
          application_deadline: event.target.value,
        });
    
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
    
        const data = {
          ...applicationData,
          author: user,
        };
    
        console.log("author should be set to", user)
    
        const response = await fetch(`${API_URL}/items/applications/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          console.log("successsssss");
          setSubmitResponseMessage("Application succesfully added! Click the refresh button to see your changes.")
        } else {
          console.log("failureeeeeeee");
          setSubmitResponseMessage("Error occurred when adding application. Please try again")

        }
      };
    
      return (
        <div>
          <h5>Add Application</h5>
          <form onSubmit={handleSubmit}>
            <div class="form-group row">
              <label class="col-4 col-form-label" for="application_company">
                Application Company
              </label>
              <div class="col-8">
                <input
                  id="application_company"
                  name="application_company"
                  type="text"
                  class="form-control"
                  required="required"
                  value={applicationData.application_company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="application_deadline" class="col-4 col-form-label">
                Application Deadline
              </label>
              <div class="col-8">
                <input
                  type="date"
                  name="application_deadline"
                  class="form-control"
                  id="date_picker_field"
                  value={applicationData.application_deadline}
                  onChange={handleDateChange}
                />
                <small id="helpText" class="form-text text-muted">
                  Please only enter a future date.
                </small>
              </div>
            </div>
            <div class="form-group row">
          <label for="application_type" class="col-4 col-form-label">
            Application Type
          </label>
          <div class="col-8">
            <select
              id="application_type"
              name="application_type"
              class="custom-select"
              value={applicationData.application_type}
              required="required"
              onChange={handleChange}
            >
              <option value="" disabled>
                Select application type
              </option>

              <option value="Graduate Job">Graduate Job</option>
              <option value="Internship">Internship</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
            <div class="form-group row">
              <label for="application_notes" class="col-4 col-form-label">
                Application Notes 
              </label>
              <div class="col-8">
                <textarea
                  id="application_notes"
                  name="application_notes"
                  cols="40"
                  rows="6"
                  class="form-control"
                  required="required"
                  value={applicationData.application_notes}
                  onChange={handleChange}
                ></textarea>
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
export default AddApplication