import React from 'react';

import PrivateHeader from './PrivateHeader';

const Dashboard = () => {
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="container">
          <h1>Welcome to boilerplate app</h1>
        </div>
      </div>
    );
}

export default Dashboard;
