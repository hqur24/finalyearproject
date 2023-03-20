import React, { Component } from 'react'
import axios from 'axios';

class ViewExams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/items/exams/')
      .then(response => {
        const exams = response.data.exams;
        this.setState({ exams });
      })
      .catch(error => {
        console.log(error);
      });
  }


render() {
    const { exams } = this.state;


  return (
    <div>
        <h5>Upcoming Exams</h5>
        {exams.map(exam => (
            <div class="card bg-light mb-3" style={{width: '18rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{exam.exam_name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Date: {exam.exam_date}</h6>
                    <p>Exam Type: {exam.exam_type}</p>
                    <p>Author: {exam.author}</p>
                    <p>Completed: {exam.exam_status.toString()} </p>
                </div>
            </div>
        ))}
    </div>
  )
}

}



export default ViewExams