import React, { useState } from 'react';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Row, Button } from 'reactstrap';

import './Appointment.scss';


function Appointment(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="AppointmentScreen">
      <Col>
        <Row>
          <h2>Appointment</h2>
        </Row>
      </Col>
    </div>
  );
}

export default withAuthContext(Appointment);
