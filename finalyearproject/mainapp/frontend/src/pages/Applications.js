import React from 'react'
import ViewApplications from '../components/ViewApplications'
import AddApplication from '../components/AddApplication'

const Applications = () => {
  return (
    <div className='container-itempage'>
      <div class="row title-text">
        <h3>Applications</h3>
      </div>
      <div class="row">
        <div class="col-8">
          <div className="pages-container-items">
            <h5 style={{ textAlign: "center" }}>Upcoming Application Deadlines</h5>
            <p style={{ textAlign: "center" }}>Added items will appear here.</p>
            <ViewApplications></ViewApplications>
          </div>
        </div>

        <div class="col-4">
          <div className="pages-container-items">
            {/* <h5 style={{ textAlign: "center" }}>Add Application</h5> */}
            <AddApplication></AddApplication>
          </div>
        </div>
      </div>
    </div>  )
}

export default Applications