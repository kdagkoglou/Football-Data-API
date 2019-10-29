import React, {Component} from 'react';
import football_data from './apis/football_data.js';

class App extends Component {

  state = {
    comps: []
  }

  componentDidMount() {
    football_data.get(`/competitions`)
      .then(res => {
        const comps = res.data.competitions;
        this.setState({ comps });
        console.log(res);
      })
  }

  render() {
    return (
      <div>
        <h5>Football-data API</h5>
        <ul>
          { this.state.comps.map(comp => 
            <li>{comp.name}</li>
            )}
        </ul>
      </div>
    )
  }
}

export default App;
