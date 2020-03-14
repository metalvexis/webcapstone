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
      {/* <Col sm={{ size:10, offset: 2}} id="HomeScreen--View">
        <Switch>
          <Route exact path="/home/sections">
            <Sections />
          </Route>

          <Route exact path="/home/schedule">
            <Schedule />
          </Route>
          
          <Route exact path="/home/project">
            <Project />
          </Route>
          
        </Switch>
      </Col> */}
    </div>
  );
}

export default withAuthContext(Home);
