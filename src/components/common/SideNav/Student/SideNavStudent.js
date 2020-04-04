import React from 'react';

import { Link } from 'react-router-dom';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

function SideNavStudent() {
  return (
    <ListGroup className="SideNav--List">
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/project">Project</Link>
      </ListGroupItem>
      <ListGroupItem className="SideNav--ListItem">
        <Link to="/home/consult">Consult</Link>
      </ListGroupItem>
    </ListGroup>
  );
}

export default SideNavStudent;
