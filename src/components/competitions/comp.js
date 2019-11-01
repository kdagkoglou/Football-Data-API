import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import football_data from '../../apis/football_data.js';
import '../App.css';
import './comp.css';

class CompInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      currentMatchday: '',
      startDate: '',
      endDate: '',
      teams: []
    }
  }

  componentDidMount = async () => {
    const { id } = this.state; 
    
    await football_data.get(`/competitions/${id}`)
      .then(res => {
        // const comp = res.data;
        this.setState({ 
          name: res.data.name,
          currentMatchday: res.data.currentSeason.currentMatchday == null ? 'N/A' : res.data.currentSeason.currentMatchday,
          startDate: res.data.currentSeason.startDate == null ? 'N/A' : res.data.currentSeason.startDate,
          endDate: res.data.currentSeason.endDate == null ? 'N/A' : res.data.currentSeason.endDate
        });
        // console.log(comp);
      })

    await football_data.get(`/competitions/${id}/teams`)
      .then(res => {
        this.setState({
          teams: res.data.teams
        });
      })
  }

  render() {
    const { id, name, currentMatchday, startDate, endDate, teams } = this.state;
    return (
      <div>

        <nav className="secondaryNav navbar navbar-light bg-light">
          <ul className="nav">
            {teams.map(team =>
              <li key={team.id} className="nav-item">
                <small>
                  <Link to={`/competitions/${id}/teams/${team.id}`} className="nav-link" title={team.name}><img src="" alt={team.name}/></Link>
                </small>
              </li>
            )}
          </ul>
        </nav>

        <div className="container-fluid mt-5">

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="true">Info</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="table-tab" data-toggle="tab" href="#table" role="tab" aria-controls="table" aria-selected="false">Table</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="fixtures-tab" data-toggle="tab" href="#fixtures" role="tab" aria-controls="fixtures" aria-selected="false">Fixtures</a>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">

            <div className="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
              {/* <CompInfo /> */}
              <div className="card text-center p-5">
                <div className="card-header">
                  {name}
                </div>
                <ul className="card-body list-unstyled">
                  <li><span className="text-muted">1st match day: </span>{startDate}</li>
                  <li><span className="text-muted">last match day: </span>{endDate}</li>
                </ul>
                <ul className="card-footer list-unstyled">
                  <li><span className="text-muted">match day: </span>{currentMatchday}</li>
                </ul>
              </div>
            </div>

            <div className="tab-pane fade" id="table" role="tabpanel" aria-labelledby="table-tab">
              {/* <CompTable /> */}
              <div className="card">
                ...
              </div>
            </div>
            
            <div className="tab-pane fade" id="fixtures" role="tabpanel" aria-labelledby="fixtures-tab">
              {/* <CompMatches /> */}
              <div className="card">
                ...
              </div>
            </div>
          
          </div>

        </div>

      </div>
    )
  }

}

export default CompInfo;
