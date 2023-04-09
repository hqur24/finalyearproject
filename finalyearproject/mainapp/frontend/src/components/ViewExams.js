import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import UpdateExam from "./UpdateModals/UpdateExam";

const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [examId, setExamId] = useState();
  const [examName, setExamName] = useState();
  const [examStatus, setExamStatus] = useState();

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
            <p>
              Status: {exam.exam_status ? "Complete" : "Incomplete"}
            </p>

            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenUpdateModal(true);
                  setExamId(exam.id);
                  setExamName(exam.exam_name);
                  setExamStatus(exam.exam_status);
                }}
              >
                Update Status
              </button>
              {openUpdateModal ? (
                <UpdateExam
                  closeUpdateModal={() => setOpenUpdateModal(false)}
                  examId={examId}
                  examName={examName}
                  previousExamStatus={examStatus}
                />
              ) : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewExams;
