import React from 'react'
import ViewMoods from '../components/ViewMoods'
import AddMood from '../components/AddMood'

const Moods = () => {
  return (
    <div>
 <div class="row title-text">
  <h3>Moods</h3>
  </div>
  <div class="row">
    <div class="col-8">
    <div className="dashboard-container-items">

        <h5 style={{textAlign:"center"}}>Mood Tracker</h5>
        <p style={{textAlign:"center"}}>Added items will appear here.</p>
        <ViewMoods></ViewMoods>    
    </div>
    </div>

    <div class="col-4">
    <div className="dashboard-container-items">
    <h5 style={{textAlign:"center"}}>Log Mood</h5>
    <AddMood></AddMood>

    </div>
    </div>     
        </div>
    </div>
  )
}

export default Moods