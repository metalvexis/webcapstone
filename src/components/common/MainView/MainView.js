import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import Project from 'screens/Project/Project.jsx';

import Schedule from 'screens/Schedule/Schedule.jsx';

import Sections from 'screens/Sections/Sections.jsx';

function MainView(props) {
  const redirect = () => {

    if ( props.AuthContext.userType === "faculty") {
      return <Redirect to="/home/schedule" />
    } else if ( props.AuthContext.userType === "student"){
      return <Redirect to="/home/project" />
    }

    return null
  }
  return (
    <Col sm={{ size:10, offset: 2}} id="HomeScreen--View">
      <Switch>
        <Route exact path="/home">
          { redirect() }
        </Route>
        <Route exact path="/home/section">
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

export default withAuthContext(MainView);
