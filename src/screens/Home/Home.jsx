import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import SideNav from 'components/common/SideNav/SideNav.jsx';

import Projects from 'screens/Projects/Projects.jsx';

import Schedule from 'screens/Schedule/Schedule.jsx';

import { Container, Col, Row } from 'reactstrap';

import './Home.scss';

function Home(props) {  
  return (
    <div className="HomeScreen">
      <SideNav/>
      
      <Col sm={{ size:10, offset: 2}} id="HomeScreen--View">
        <Switch>
          <Route exact path="/home/projects">
            <Projects />
          </Route>

          <Route exact path="/home/schedule">
            <Schedule />
          </Route>
          
          <Route exact path="/home/appointment">
          </Route>
        </Switch>
      </Col>
    </div>
  );
}

export default withAuthContext(Home);
