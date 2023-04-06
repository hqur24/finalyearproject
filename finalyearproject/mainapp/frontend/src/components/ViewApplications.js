import React, { Component } from 'react'
import axios from 'axios';

class ViewApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/items/applications/')
      .then(response => {
        const applications = response.data.applications;
        this.setState({ applications });
      })
      .catch(error => {
        console.log(error);
      });
  }


render() {
    const { applications } = this.state;


  return (
    <div>
        {applications.map(application => (
            <div class="card bg-light mb-3" style={{width: '18rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{application.application_company}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Due date: {application.application_deadline}</h6>
                    <p>Application Type: {application.application_type}</p>
                    <p>Author: {application.author}</p>
                    <p>Completed: {application.application_status.toString()} </p>
                </div>
            </div>
        ))}
    </div>
  )
}

}
export default ViewApplications