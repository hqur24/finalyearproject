import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatusExam from "./UpdateModals/UpdateStatusExam";
import UpdateDateExam from "./UpdateModals/UpdateDateExam";
import DeleteExam from "./DeleteModals/DeleteExam";
import FormatDate from "./FormatDate";

const ViewExams = () => {
  const [exams, setExams] = useState([]);

  // update status functionality
  const [openStatusModal, setOpenStatusModal] = useState(false);
  //update date functionality
  const [openDateModal, setOpenDateModal] = useState(false);
  // delete functionality
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  // if status is either and date is also either (for now)
  const currentExamsArray = exams.filter(
    (exam) =>  !exam.exam_status
      // (new Date(exam.exam_date) < new Date() && !exam.assignment_status) 
      // ||(new Date(exam.exam_date) > new Date())

  );

  //if date is in past and status is complete (true)
  const pastExamsArray = exams.filter(
    // (exam) => new Date(exam.exam_date) < new Date() && exam.exam_status
    (exam) =>  exam.exam_status

  );

  const ceaLength = currentExamsArray.length;
  const peaLength = pastExamsArray.length;

  return (
    <div>
      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={refreshButtonClick}
      >
        Refresh Exams
      </button>
      {ceaLength >= 1 && (
        <div className="current-container">
          <h4>Current Exams</h4>
          {currentExamsArray.map((exam, index) => (
            <div
              class="card bg-light mb-3 item-card"
              style={{ width: "18rem" }}
            >
              <div class="card-body">
                <div className="card-heading">
                  <h5 class="card-title">{exam.exam_name}</h5>
                  <div className="inline-buttons">
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setExamId(exam.id);
                        setExamName(exam.exam_name);
                      }}
                    >
                      Delete
                    </button>

                    {openDeleteModal ? (
                      <DeleteExam
                        closeDeleteModal={() => setOpenDeleteModal(false)}
                        examId={examId}
                        examName={examName}
                      />
                    ) : null}
                  </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">
                  Date: <FormatDate dateString={exam.exam_date}/>
                </h6>
                <p>Exam Type: {exam.exam_type}</p>
                <p>Author: {exam.author}</p>
                <p>Status: {exam.exam_status ? "Complete" : "Incomplete"}</p>

                <div className="card-buttons">
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {peaLength >= 1 && (
        <div className="past-container">
          <h4>Completed Exams</h4>
          {pastExamsArray.map((exam, index) => (
            <div class="card bg-light mb-3 item-card" style={{ width: "18rem" }}>
              <div class="card-body">
                <div className="card-heading">
                <h5 class="card-title">{exam.exam_name}</h5>
                
                <div className="inline-buttons">
                <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setExamId(exam.id);
                      setExamName(exam.exam_name);
                    }}
                  >
                    Delete
                  </button>

                  {openDeleteModal ? (
                    <DeleteExam
                      closeDeleteModal={() => setOpenDeleteModal(false)}
                      examId={examId}
                      examName={examName}
                    />
                  ) : null}
                </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">
                Date: <FormatDate dateString={exam.exam_date}/>
                </h6>
                <p>Exam Type: {exam.exam_type}</p>
                <p>Author: {exam.author}</p>
                <p>Status: {exam.exam_status ? "Complete" : "Incomplete"}</p>

                  <div className="card-buttons">
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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

                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewExams;
