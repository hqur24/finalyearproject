import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import FormatDate from "./FormatDate";
const API_URL = process.env.REACT_APP_API_URL;

const DashboardExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/items/exams/`)
      .then((response) => {
        const exams = response.data.exams;
        setExams(exams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // if status is either and date is also either (for now)
  const currentExamsArray = exams.filter(
    (exam) => !exam.exam_status
    // (new Date(exam.exam_date) < new Date() && !exam.assignment_status)
    // ||(new Date(exam.exam_date) > new Date())
  );

  //if date is in past and status is complete (true)
  const pastExamsArray = exams.filter(
    // (exam) => new Date(exam.exam_date) < new Date() && exam.exam_status
    (exam) => exam.exam_status
  );

  const ceaLength = currentExamsArray.length;
  const peaLength = pastExamsArray.length;

  return (
    <div>
      <hr></hr>
      {ceaLength >= 1 && (
        <div className="current-container">
          <h6 style={{}}>Current </h6>
          <p style={{ fontSize: "x-small", fontStyle: "italic" }}>
            {" "}
            (Based on status and not date. Please check the Help page for
            further clarification)
          </p>
          {currentExamsArray.slice(0,4).map((exam, index) => (
            <div
              class="card bg-light mb-3 item-card"
              style={{ width: "18rem" }}
            >
              <div class="card-body">
                <div className="card-heading">
                  <h5 class="card-title">{exam.exam_name}</h5>
                </div>

                <h6 class="card-subtitle mb-2 text-muted">
                  Due date: <FormatDate dateString={exam.exam_date} />
                </h6>
                <p>Exam Type: {exam.exam_type}</p>
                <p>Author: {exam.author}</p>
                <p>Status: {exam.exam_status ? "Complete" : "Incomplete"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {peaLength >= 0 && (
        <div className="past-container">
          <h5>Completed Exams</h5>
          <div>
            <p>Visit the exams page to view your completed exams.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardExams;
