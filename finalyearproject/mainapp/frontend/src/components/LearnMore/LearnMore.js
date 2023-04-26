import React from "react";
import { Link} from 'react-router-dom';
import "./LearnMore.css";

const LearnMore = ({ text, closeLearnMore }) => {
  return (
    <div className="learnmore-popup-container">
      <div className="learnmore-popup-body">
        <button className="btn learnmore-close-button" onClick={closeLearnMore}>
          X
        </button>
        <br></br>

        <h5>What is StudentSmart?</h5>
        <p>
          StudentSmart is an all-in-one platform aimed at improving student's
          productivity with a unique focus on tracking wellbeing alongside.
        </p>
        <p>
          This platform allows students to manage their assignments, upcoming
          exams applications all from one place.{" "}
        </p>
        <p>
          StudentSmart also provides a Mood Tracking functionality, where a user
          can input how they are feeling that day (or a date within the past 7
          days) from a selection of 6 options. This will help them track their
          wellbeing history.
        </p>
        <p> <strong> <Link to='/register'> Join now!</Link></strong></p>
      </div>
    </div>
  );
};

export default LearnMore;
