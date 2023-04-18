import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatusApplication from "./UpdateStatusModals/UpdateStatusApplication";
import UpdateDateApplication from "./UpdateDateModals/UpdateDateApplication";
import DeleteApplication from "./DeleteModals/DeleteApplication";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  // update status functionality
  const [openStatusModal, setOpenStatusModal] = useState(false);
  //update date functionality
  const [openDateModal, setOpenDateModal] = useState(false);
    // delete functionality
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  const [applicationId, setApplicationId] = useState();
  const [applicationCompany, setApplicationCompany] = useState();
  const [applicationStatus, setApplicationStatus] = useState();
  const [applicationDeadline, setApplicationDeadline] = useState();

  const [refreshButton, setRefreshButton] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/items/applications/")
      .then((response) => {
        const applications = response.data.applications;
        setApplications(applications);
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
        Refresh Applications
      </button>
      {applications.map((application) => (
        <div class="card bg-light mb-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{application.application_company}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Deadline: {application.application_deadline}
            </h6>
            <p>Application Type: {application.application_type}</p>
            <p>Application Notes: {application.application_notes} </p>
            <p>Author: {application.author}</p>
            <p>Status: {application.application_status ? "Past" : "Current"}</p>

            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenStatusModal(true);
                  setApplicationId(application.id);
                  setApplicationCompany(application.application_company);
                  setApplicationStatus(application.application_status);
                }}
              >
                Update Status
              </button>

              {openStatusModal ? (
                <UpdateStatusApplication
                  closeUpdateModal={() => setOpenStatusModal(false)}
                  applicationId={applicationId}
                  applicationCompany={applicationCompany}
                  previousApplicationStatus={applicationStatus}
                />
              ) : null}
            </p>
            <p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setOpenDateModal(true);
                  setApplicationId(application.id);
                  setApplicationCompany(application.application_company);
                  setApplicationDeadline(application.application_deadline);
                }}
              >
                Update Deadline
              </button>

              {openDateModal ? (
                <UpdateDateApplication
                  closeUpdateModal={() => setOpenDateModal(false)}
                  applicationId={applicationId}
                  applicationCompany={applicationCompany}
                  previousApplicationDeadline={applicationDeadline}
                />
              ) : null}
            </p>
            <p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setOpenDeleteModal(true);
                  setApplicationId(application.id);
                  setApplicationCompany(application.application_company);
                }}
              >
                Delete
              </button>

              {openDeleteModal ? (
                <DeleteApplication
                  closeDeleteModal={() => setOpenDeleteModal(false)}
                  applicationId={applicationId}
                  applicationCompany={applicationCompany}
                />
              ) : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ViewApplications;
