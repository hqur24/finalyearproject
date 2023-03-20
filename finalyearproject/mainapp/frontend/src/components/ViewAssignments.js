import React, { Component } from 'react'
import axios from 'axios';

class ViewAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/items/assignments/')
      .then(response => {
        const assignments = response.data.assignments;
        this.setState({ assignments });
      })
      .catch(error => {
        console.log(error);
      });
  }


render() {
    const { assignments } = this.state;


  return (
    <div>
        <h5>Current Assignments</h5>
        {assignments.map(assignment => (
            <div class="card bg-light mb-3" style={{width: '18rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{assignment.assignment_title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Due date: {assignment.due_date}</h6>
                    <p>{assignment.assignment_desc}</p>
                    <p>Author: {assignment.author}</p>
                    <p>Completed: {assignment.assignment_status.toString()} </p>
                </div>
            </div>
        ))}
    </div>
 )
}

}



export default ViewAssignments