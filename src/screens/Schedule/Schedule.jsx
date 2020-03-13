import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Calendar, momentLocalizer } from 'react-big-calendar'

import moment from 'moment'

import { Button, Col, Row } from 'reactstrap';

import ModalCreateSchedule from 'components/ModalCreateSchedule/ModalCreateSchedule.jsx'

import './Schedule.scss';

function Schedule(props) {  

  const localizer = momentLocalizer(moment)

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="ScheduleScreen">
      <Col>
        <ModalCreateSchedule isOpen={isOpen} toggle={toggleModal} />
        <Row>
          <h2>Schedule</h2>
        </Row>
        <Row>
          <Button onClick={toggleModal}>Create Event</Button>
        </Row>
        <Row>
          <Calendar
            localizer={localizer} 
            events={[]} 
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}/>
        </Row>
      </Col>
    </div>
  );
}

export default withAuthContext(Schedule);
