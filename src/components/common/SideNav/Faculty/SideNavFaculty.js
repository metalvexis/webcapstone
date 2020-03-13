import React from 'react';

import { Link } from 'react-router-dom';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

function SideNavFaculty() {
  return (
    <ListGroup className="SideNav--List">
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/sections">Sections</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/schedule">Schedule</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/appointment">Appointment</Link>
      </ListGroupItem>
    </ListGroup>
  );
}

export default SideNavFaculty;
