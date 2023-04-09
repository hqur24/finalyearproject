import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import UpdateApplication from "./UpdateModals/UpdateApplication";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [applicationId, setApplicationId] = useState();
  const [applicationCompany, setApplicationCompany] = useState();
  const [applicationStatus, setApplicationStatus] = useState();

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
  }, []);

    return (
      <div>
        {applications.map((application) => (
          <div class="card bg-light mb-3" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">{application.application_company}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Due date: {application.application_deadline}
              </h6>
              <p>Application Type: {application.application_type}</p>
              <p>Author: {application.author}</p>
              <p>
                Status:{" "}
                {application.application_status ? "Past" : "Current"}
              </p>

              <p>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => {
                    setOpenUpdateModal(true);
                    setApplicationId(application.id);
                    setApplicationCompany(application.application_company);
                    setApplicationStatus(application.application_status);
                  }}
                >
                  Update Status
                </button>

                {openUpdateModal ? (
                  <UpdateApplication
                    closeUpdateModal={() => setOpenUpdateModal(false)}
                    applicationId={applicationId}
                    applicationCompany={applicationCompany}
                    previousApplicationStatus={applicationStatus}
                  />
                ) : null}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
export default ViewApplications;
