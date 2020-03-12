import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import SideNav from 'components/common/SideNav/SideNav.jsx';


import { Container, Col, Row } from 'reactstrap';

import './Schedule.scss';

function Schedule(props) {  
  return (
    <div className="ScheduleScreen">
      <Col>
          <Row>
            <h2>Schedule</h2>
          </Row>
        </Col>
    </div>
  );
}

export default withAuthContext(Schedule);
