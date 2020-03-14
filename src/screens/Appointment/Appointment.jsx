import React, { useState } from 'react';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Row, Button } from 'reactstrap';

import './AppointmentScreen.scss';

function Appointment(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="AppointmentScreen">
      <Col>
        <ModalCreateSection isOpen={isOpen} toggle={toggleModal} />
        <Row>
          <h2>Appointment</h2>
        </Row>
      </Col>
    </div>
  );
}

export default withAuthContext(Appointment);
