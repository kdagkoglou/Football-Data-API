import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import football_data from '../../apis/football_data.js';
// import SideNav from '../SideNav';
import '../App.css';
import './comp.css';

class Comp extends Component {

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
                  <Link to={`/competitions/${id}/teams/${team.id}`} className="nav-link" title={team.name}><img src="" alt={team.id}/></Link>
                </small>
              </li>
            )}
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 d-none d-sm-block bg-light vh-100">
              <nav className="nav flex-column p-3">
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/info`}>Info</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/table`}>Table</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/results`}>Results</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/fixtures`}>Fixtures</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/teams`}>Teams</NavLink>
              </nav>
            </div>
            <div className="col-sm-10">
              <div className="card text-center p-5 border-0">
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
          </div>
        </div>

      </div>
    )
  }

}

export default Comp;
