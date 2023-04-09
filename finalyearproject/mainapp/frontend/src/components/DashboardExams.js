import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const DashboardExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/items/exams/")
      .then((response) => {
        const exams = response.data.exams;
        setExams(exams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {exams.map((exam, index) => (
        <div class="card bg-light mb-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{exam.exam_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Date: {exam.exam_date}
            </h6>
            <p>Exam Type: {exam.exam_type}</p>
            <p>Author: {exam.author}</p>
            <p>Status: {exam.exam_status ? "Complete" : "Incomplete"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardExams;
