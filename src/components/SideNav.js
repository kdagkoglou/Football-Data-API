import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './SideNav.css';

class SideNav extends Component {

  render() {
    return (
      <nav className="nav flex-column">
        <NavLink className="nav-link" to="/info">Info</NavLink>
        <NavLink className="nav-link" to="/table">Table</NavLink>
        <NavLink className="nav-link" to="/results">Results</NavLink>
        <NavLink className="nav-link" to="/fixtures">Fixtures</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
      </nav>
    )
  }
}

export default SideNav;