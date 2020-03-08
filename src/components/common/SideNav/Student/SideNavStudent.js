import React from 'react';

import { Link } from 'react-router-dom';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

function SideNavStudent() {
  return (
    <ListGroup className="SideNav--List">
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/dashboard">Dashboard</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/dashboard">Advisor</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/dashboard">Consult</Link>
      </ListGroupItem>
    </ListGroup>
  );
}

export default SideNavStudent;
