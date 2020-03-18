import React from 'react';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import SideNav from 'components/common/SideNav/SideNav.jsx';

import MainView from 'components/common/MainView/MainView.js';

import './Home.scss';

function Home(props) {  
  return (
    <div className="HomeScreen">
      <SideNav/>

      <MainView/>
    </div>
  );
}

export default withAuthContext(Home);
