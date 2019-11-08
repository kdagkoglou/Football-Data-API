import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import football_data from '../apis/football_data';

class CompTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      tableTotal: [],
      tableHome: [],
      tableAway: []
    }
  }

  componentDidMount = async () => {
    const { id } = this.state;

    await football_data.get(`/competitions/${id}/standings`)
      .then(res => {
        // console.log(res);
        let standings = res.data.standings;
        this.setState({
          tableTotal: standings[0].table,
          tableHome: standings[1].table,
          tableAway: standings[2].table
        });
      })
  }

  render() {
    const { id, tableTotal } = this.state;
    return (
      <div className="table-responsive">
        <table className="table compTable table-sm table-borderless table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col" title="position">Pos</th>
              <th scope="col" title="club">Team</th>
              <th scope="col" title="games played">G.P.</th>
              <th scope="col" title="won">W</th>
              <th scope="col" title="draw">D</th>
              <th scope="col" title="lost">L</th>
              <th scope="col" title="points">P</th>
              <th scope="col" title="goals for">G.F.</th>
              <th scope="col" title="goals against">G.A.</th>
              <th scope="col" title="goal difference">G.D.</th>
            </tr>
          </thead>
          <tbody>
            {tableTotal.map(t => 
              <tr key={t.team.id}>
                <th scope="row">{t.position}</th>
                <td>
                  <Link to={`/competitions/${id}/teams/${t.team.id}`} title={t.team.name}><img src={`/assets/images/competitions/${id}/normal/${t.team.id}.png`} alt={t.team.id} /></Link>  
                </td>    
                <td>{t.playedGames}</td>    
                <td>{t.won}</td>    
                <td>{t.draw}</td>    
                <td>{t.lost}</td>    
                <td>{t.points}</td>    
                <td>{t.goalsFor}</td>    
                <td>{t.goalsAgainst}</td>    
                <td>{t.goalDifference}</td>    
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

}

export default CompTable;
