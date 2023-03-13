import React, { Component } from 'react'
import axios from 'axios';

class ViewMoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moods: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/items/moods/')
      .then(response => {
        const moods = response.data.moods;
        this.setState({ moods });
      })
      .catch(error => {
        console.log(error);
      });
  }


render() {
    const { moods } = this.state;


  return (
    <div>
        <h5>Moods</h5>
        {moods.map(mood => (
            <div class="card bg-light mb-3" style={{width: '18rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{mood.mood_date}: {mood.mood_choice}</h5>
                    <p>Author: {mood.author}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

}



export default ViewMoods