import React from 'react';

const CopmInfo = ({ name, currentMatchday, startDate, endDate }) => {
  return (
    <div className="card text-center p-5 border-0">
      <div className="card-header">
        {name} Info
      </div>
      <ul className="card-body list-unstyled">
        <li><span className="text-muted">1st match day: </span>{startDate}</li>
        <li><span className="text-muted">last match day: </span>{endDate}</li>
      </ul>
      <ul className="card-footer list-unstyled">
        <li><span className="text-muted">match day: </span>{currentMatchday}</li>
      </ul>
    </div>
  );
};

export default CopmInfo;