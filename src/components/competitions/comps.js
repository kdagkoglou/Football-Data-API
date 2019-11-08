import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import football_data from '../../apis/football_data.js';

class CompsList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      comps: [],
      isLoading: false
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await football_data.get(`/competitions?plan=TIER_ONE&areas=2077`)
      .then(res => {
        // const comps = res.data.competitions;
        this.setState({ 
          comps: res.data.competitions,
          isLoading: false
        });
        // console.log(res);
      })
  }

  render() {
    const { comps, isLoading } = this.state;

    return (
      <div className="container mb-5">
        {!isLoading && (
          <div className="d-flex flex-wrap align-items-stretch justify-content-center mb-3">
            {comps.map(comp =>
              <div key={comp.id} className="card p-2 shadow grow" style={{ width: '15rem', margin: '0.5rem' }}>
                <img src={`/assets/images/competitions/logos/normal/${comp.id}.png`} className="card-img-top" style={{ height: '14rem' }} alt={comp.name} />
                <h6 className="card-header mt-5">
                  {comp.name}
                </h6>
                <div className="card-body">
                  <p className="card-subtitle">comp id: <span className="text-primary">{comp.id}</span></p>
                  <p className="card-subtitle">Area: <span className="text-primary">{comp.area.name}</span></p>
                  <Link to={`/competitions/${comp.id}`} className="stretched-link"> </Link>
                </div>
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <table className="container alertTable">
            <tbody>
              <tr>
                <td className="alert alert-danger text-center align-middle" role="alert">Loading...</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    )
  }

}

export default CompsList;
