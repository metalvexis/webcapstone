import React from 'react';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import './Home.scss';

function Home(props) {  
  return (
    <div className="HomeScreen">
    </div>
  );
}

export default withAuthContext(Home);
