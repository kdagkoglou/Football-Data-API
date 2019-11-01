import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';

class Header extends Component {

  render() {
    return (
      <div className="topNav">
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <Link to="/" className="navbar-brand"> <i className="fa fa-futbol-o mr-1"></i> Football Data</Link>
          <div className="navbar-nav">
            <Link to="/competitions" className="nav-item nav-link">Competitions</Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header;