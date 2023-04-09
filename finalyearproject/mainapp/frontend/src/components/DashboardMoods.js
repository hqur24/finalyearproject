import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';

const DashboardMoods = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/items/moods/')
      .then(response => {
        const moods = response.data.moods;
        setMoods(moods);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
        {moods.map((mood, index) => (
            <div class="card bg-light mb-3" style={{width: '18rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{mood.mood_date}: {mood.mood_choice}</h5>
                    <p>Author: {mood.author}</p>
                </div>
            </div>
        ))}
    </div>
 );
}

export default DashboardMoods
