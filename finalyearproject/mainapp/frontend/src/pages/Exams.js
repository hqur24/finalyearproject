import React from 'react'
import ViewExams from '../components/ViewExams'
import AddExam from '../components/AddExam'

const Exams = () => {
  return (
    <div className='container-itempage'>
 <div class="row title-text">
  <h3>Exams</h3>
  </div>
  <div class="row">
    <div class="col-8">
    <div className="pages-container-items">

        <h5 style={{textAlign:"center"}}>Upcoming Exams</h5>
        <p style={{textAlign:"center"}}>Added items will appear here.</p>
        <ViewExams></ViewExams>    
    </div>
    </div>

    <div class="col-4">
    <div className="pages-container-items">
    {/* <h5 style={{textAlign:"center"}}>Add Exam</h5> */}
    <AddExam></AddExam>

    </div>
    </div>     
        </div>
    </div>
  )
}

export default Exams