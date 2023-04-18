import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatusExam from "./UpdateStatusModals/UpdateStatusExam";
import UpdateDateExam from "./UpdateDateModals/UpdateDateExam";

const ViewExams = () => {
  const [exams, setExams] = useState([]);

  // update status functionality
  const [openStatusModal, setOpenStatusModal] = useState(false);
  //update date functionality
  const [openDateModal, setOpenDateModal] = useState(false);

  const [examId, setExamId] = useState();
  const [examName, setExamName] = useState();
  const [examStatus, setExamStatus] = useState();
  const [examDate, setExamDate] = useState();
  const [refreshButton, setRefreshButton] = useState(false);

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
  }, [refreshButton]);

  const refreshButtonClick = () => {
    setRefreshButton(!refreshButton);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={refreshButtonClick}
      >
        Refresh Exams
      </button>
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

            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenStatusModal(true);
                  setExamId(exam.id);
                  setExamName(exam.exam_name);
                  setExamStatus(exam.exam_status);
                }}
              >
                Update Status
              </button>
              {openStatusModal ? (
                <UpdateStatusExam
                  closeUpdateModal={() => setOpenStatusModal(false)}
                  examId={examId}
                  examName={examName}
                  previousExamStatus={examStatus}
                />
              ) : null}
            </p>
            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenDateModal(true);
                  setExamId(exam.id);
                  setExamName(exam.exam_name);
                  setExamDate(exam.exam_date);
                }}
              >
                Update Due Date
              </button>

              {openDateModal ? (
                <UpdateDateExam
                  closeUpdateModal={() => setOpenDateModal(false)}
                  examId={examId}
                  examName={examName}
                  previousExamDate={examDate}
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
