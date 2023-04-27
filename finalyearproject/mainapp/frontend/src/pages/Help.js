import React from "react";

const Help = () => {
  return (
    <div className="container-itempage">
      <div class="row title-text">
        <h3>Help/FAQs</h3>
      </div>
      <div class="row">
        <div class="col-12">
          <div className="pages-container-items">
            <h6>
              What does it mean 'Based on status and not date. Please check the
              Help page for further clarification.' on the dashboard?
            </h6>
            <p>
              This means that the way the exam items are classified is dependent
              on the status, not the date. Even if an exam date has passed, it
              will still remain in the 'Current Exams' section until the status
              is manually set to complete. The reason for this is to ensure
              exams are only being ticked off by the user and not the system
              automatically assigning.
            </p>
            <h6>
              Can I add an image to my assignment description/application notes?
            </h6>
            <p>
              At this current moment there is not functionality to submit image
              files in these fields. We suggest submitting URLs of these images
              which can be rendered as text and copied.
            </p>
            <h6>
              Are there any other status choices - for example, 'In Progress'?
            </h6>
            <p>
              No, at this moment of time the only two possible options are
              'Complete' and 'Not Completed'. We suggest only marking an item as
              complete when it is 100% finished, rather than immediately when
              you have started working on it.
            </p>
            <h6>
              What does it mean 'Please be aware that if this entry is more than
              7 days in the past you will not be able to resubmit an updated
              mood.' when I am deleting a mood entry?
            </h6>
            <p>
              This means that if the mood is more than 7 days old, once it is
              deleted, you will not be able to overwrite that entry with a new
              one, as the system does not allow for entries more than 7 days in
              the past to be added. The reason for this is to preserve database
              integrity. If you feel that this mood entry is particularly
              inaccurate, please just delete it and continue to use the
              application regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
