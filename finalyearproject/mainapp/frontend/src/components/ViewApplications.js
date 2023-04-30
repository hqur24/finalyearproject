import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateStatusApplication from "./UpdateModals/UpdateStatusApplication";
import UpdateDateApplication from "./UpdateModals/UpdateDateApplication";
import DeleteApplication from "./DeleteModals/DeleteApplication";
import FormatDate from "./FormatDate";
const API_URL = process.env.REACT_APP_API_URL;

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
      .get(`${API_URL}/items/applications/`)
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

  // if date is in past and status is incomplete (false)
  const overdueApplicationsArray = applications.filter(
    (application) =>
      new Date(application.application_deadline) < new Date() &&
      !application.application_status
  );

  // if date is in future and status is incomplete (false)
  const currentApplicationsArray = applications.filter(
    (application) => new Date(application.application_deadline) > new Date()  
    && !application.application_status
  );

  //if status is complete (true) and date can be either
  const pastApplicationsArray = applications.filter(
    (application) => application.application_status
  );

  const ooaLength = overdueApplicationsArray.length;
  const caaLength = currentApplicationsArray.length;
  const paaLength = pastApplicationsArray.length;

  return (
    <div>
      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={refreshButtonClick}
      >
        Refresh Applications
      </button>

      {ooaLength >= 1 && (
        <div className="overdue-container">
          <h4 className="typewriter-text">Overdue Applications!</h4>
          {overdueApplicationsArray.map((application) => (
            <div class="card bg-light mb-3 item-card" style={{ width: "18rem" }}>
              <div class="card-body">
                <div className="card-heading">
                          <h5 class="card-title">{application.application_company}</h5>
        
                  <div className="inline-buttons">
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
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
                  </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">
                  Deadline: <FormatDate dateString={application.application_deadline}/>
                </h6>
                <p>Application Type: {application.application_type}</p>
                <p>Application Notes: {application.application_notes} </p>
                <p>Author: {application.author}</p>
                <p>
                  Status: {application.application_status ? "Past" : "Current"}
                </p>

                  <div className="card-buttons">
                    <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  </div>
                     
              </div>
            </div>
          ))}
        </div>
      )}

      {caaLength >= 1 && (
        <div className="current-container">
          <h4>Current Applications</h4>
          {currentApplicationsArray.map((application) => (
            <div class="card bg-light mb-3 item-card" style={{ width: "18rem" }}>
              <div class="card-body">
                <div className="card-heading">
                <h5 class="card-title">{application.application_company}</h5>

                  <div className="inline-buttons">
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
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
                  </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">
                Deadline: <FormatDate dateString={application.application_deadline}/>
                </h6>
                <p>Application Type: {application.application_type}</p>
                <p>Application Notes: {application.application_notes} </p>
                <p>Author: {application.author}</p>
                <p>
                  Status: {application.application_status ? "Past" : "Current"}
                </p>
                <div div className="card-buttons">
                    <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  </div>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {paaLength >= 1 && (
        <div className="past-container">
          <h4>Past Applications</h4>
          {pastApplicationsArray.map((application) => (
            <div class="card bg-light mb-3 item-card" style={{ width: "18rem" }}>
              <div class="card-body">
                <div className="card-heading">
                      <h5 class="card-title">{application.application_company}</h5>

                  <div className="inline-buttons">
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
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
                  </div>
                </div>

                <h6 class="card-subtitle mb-2 text-muted">
                Deadline: <FormatDate dateString={application.application_deadline}/>
                </h6>
                <p>Application Type: {application.application_type}</p>
                <p>Application Notes: {application.application_notes} </p>
                <p>Author: {application.author}</p>
                <p>
                  Status: {application.application_status ? "Past" : "Current"}
                </p>

                  <div className="card-buttons">
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  <button
                    type="button"
                    className="btn btn-info update-btn"
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
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ViewApplications;
