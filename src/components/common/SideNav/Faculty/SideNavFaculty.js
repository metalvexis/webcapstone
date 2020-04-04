import React from 'react';

import { Link } from 'react-router-dom';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

function SideNavFaculty() {
  return (
    <ListGroup className="SideNav--List">
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/schedule">Schedule</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/section">Section</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/project">Project</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/appointment">Appointment</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/milestones">Milestones</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/criteria">Grading Sheets</Link>
      </ListGroupItem>
    </ListGroup>
  );
}

export default SideNavFaculty;
