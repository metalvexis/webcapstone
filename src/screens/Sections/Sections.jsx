import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Container, Col, Row, Button } from 'reactstrap';

import ModalCreateSection from 'components/ModalCreateSection/ModalCreateSection.jsx'

import ListSection from 'components/ListSection/ListSection.jsx'

import './Sections.scss';

function Sections(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="SectionsScreen">
      <Col>
        <ModalCreateSection isOpen={isOpen} toggle={toggleModal} />
        <Row>
          <h2>Sections</h2>
        </Row>
        <Row>
          <Button onClick={toggleModal}>Create Section</Button>
        </Row>

        <Row>
          <Col md={12}>
            <ListSection />
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default withAuthContext(Sections);
