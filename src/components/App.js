import React, {Component} from 'react';
import football_data from '../apis/football_data.js';
import texts from '../lib/texts.js';

class App extends Component {

  state = {
    comps: []
  }

  componentDidMount() {
    football_data.get(`/competitions?plan=TIER_ONE&areas=2077`)
      .then(res => {
        const comps = res.data.competitions;
        this.setState({ comps });
        console.log(res);
      })
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-wrap align-items-stretch justify-content-center mb-3">
          { this.state.comps.map(comp => 
            <div key={comp.id} className="card p-2" style={{ width: '15rem', margin: '0.5rem' }}>
              <img src={texts.IMGS.comps.values[comp.id]} className="card-img-top" style={{ maxHeight: '15rem' }} alt={comp.name} />
              <h6 className="card-header mt-5">
                {comp.name}
              </h6>
              <div className="card-body">
                <p className="card-subtitle">comp id: <span className="text-primary">{comp.id}</span></p> 
                <p className="card-subtitle">Area: <span className="text-primary">{comp.area.name}</span></p> 
                <a href={'/competitions/' + comp.id} className="stretched-link"></a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App;
