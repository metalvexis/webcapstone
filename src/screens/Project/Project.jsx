import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Container, Col, Row, Button } from 'reactstrap';

import ModalCreateProject from 'components/ModalCreateProject/ModalCreateProject.jsx'

import ListProject from 'components/ListProject/ListProject.jsx'

import './Project.scss';

function Project(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="ProjectScreen">
      <Col>
        <ModalCreateProject isOpen={isOpen} toggle={toggleModal} />
        <Row>
          <h2>Project</h2>
        </Row>
        
        <Row>
          <Button onClick={toggleModal}>Create Project</Button>
        </Row>

        <Row>
          <ListProject />
        </Row>

        
      </Col>
    </div>
  );
}

export default withAuthContext(Project);
