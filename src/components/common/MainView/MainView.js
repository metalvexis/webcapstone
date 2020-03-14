import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import Project from 'screens/Project/Project.jsx';

import Schedule from 'screens/Schedule/Schedule.jsx';

import Sections from 'screens/Sections/Sections.jsx';

function MainView() {
  return (
    <Col sm={{ size:10, offset: 2}} id="HomeScreen--View">
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
    </Col>
  );
}

export default MainView;
