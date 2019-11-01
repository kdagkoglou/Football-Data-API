import React, { Component } from 'react';
import texts from '../lib/texts.js';

class Footer extends Component {
  
  render() {
    return (
      <div>
        <footer className="navbar fixed-bottom bg-dark">
          <span className="mx-auto align-middle text-light">{texts.CR.text}</span>
        </footer>
      </div>
    )
  }
}

export default Footer;