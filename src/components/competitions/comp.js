import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import football_data from '../../apis/football_data';
import utility from '../../utilities/utility';
import CompInfo from '../CompInfo';
import CompTable from '../CompTable';
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
        let teams = res.data.teams.sort(utility.sortByName);
        this.setState({
          teams: teams
        });
      })
  }

  render() {
    const { id, name, currentMatchday, startDate, endDate, teams } = this.state;
    return (
      <div>

        <nav className="secondaryNav navbar navbar-light bg-gray text-right">
          <div className="col-sm-2 text-sm-left text-center">
            <h6 className="pl-2">{name}</h6>
          </div>
          <ul className="nav col-sm-10">
            {teams.map(team =>
              <li key={team.id} className="nav-item">
                <small>
                  <Link to={`/competitions/${id}/teams/${team.id}`} className="nav-link" title={team.name}><img src={`/assets/images/competitions/${id}/normal/${team.id}.png`} alt={team.id}/></Link>
                </small>
              </li>
            )}
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="sideNav col-sm-2 d-none d-sm-block bg-light vh-100">
              <nav className="nav flex-column p-3">
                <NavLink activeClassName="chosen" className="nav-link" exact to={`/competitions/${id}`}>Info</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/table`}>Table</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/results`}>Results</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/fixtures`}>Fixtures</NavLink>
                <NavLink activeClassName="chosen" className="nav-link" to={`/competitions/${id}/teams`}>Teams</NavLink>
              </nav>
            </div>
            <div className="col-sm-10">
              <div className="container mt-5">
                <Route 
                  path={`/competitions/${id}`}
                  exact
                  children={<CompInfo name={name} currentMatchday={currentMatchday} startDate={startDate} endDate={endDate}/>}
                />

                <Route
                  path={`/competitions/${id}/table`}
                  children={<CompTable id={id} />} 
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}

export default Comp;
