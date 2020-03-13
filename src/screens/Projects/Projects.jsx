import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Container, Col, Row, Button } from 'reactstrap';

import ModalCreateSection from 'components/ModalCreateSection/ModalCreateSection.jsx'

import ListSection from 'components/ListSection/ListSection.jsx'

import './Projects.scss';

function Projects(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="ProjectsScreen">
      <Col>
        <ModalCreateSection isOpen={isOpen} toggle={toggleModal} />
        <Row>
          <h2>Projects</h2>
        </Row>
        <Row>
          <Button onClick={toggleModal}>Create Section</Button>
        </Row>

        <Row>
          <ListSection />
        </Row>

        
      </Col>
    </div>
  );
}

export default withAuthContext(Projects);
