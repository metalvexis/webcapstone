import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import EventCalendar from 'react-event-calendar'

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import './Calendar.scss';

class Calendar extends React.Component {

  render() {
    return (
      <EventCalendar 
      month={0}
      year={2019}/>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(Calendar);
