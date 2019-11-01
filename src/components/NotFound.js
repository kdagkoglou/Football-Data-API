import React, { Component } from 'react';
import './App.css';

class NotFound extends Component {

  render() {
    return (
      <table className="container alertTable">
        <tbody>
          <tr>
            <td className="alert alert-danger text-center align-middle" role="alert">NotFound</td>
          </tr>  
        </tbody>
      </table>
    )
  }

}

export default NotFound;
