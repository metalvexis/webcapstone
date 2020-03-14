import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import moment from 'moment'

import { StoneApi } from 'lib/StoneApi.js';

import './EventCalendar.scss';

class EventCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
  }

  async componentDidMount () {
    if(this.props.AuthContext && this.props.AuthContext.user) {
      this.updateEvents()
    }
    
  }

  async componentDidUpdate (prevProps) {
    if(prevProps.AuthContext !== this.props.AuthContext) {
      this.updateEvents()
    }
    
  }

  updateEvents = async () => {
    const schedules = await StoneApi.Faculty.getConsultationSchedule(this.props.AuthContext.user.id)

    const events = schedules.map(sched=>{ 
      let start = new Date(moment(sched.dateTime))
      let end = new Date(moment(sched.dateTime).add(1, 'h'))

      return {
        title: "Consultation",
        start, end, ConsultationScheduleId: sched.id
      } 
    })

    console.log({events})
    this.setState({ events })
  }

  render() {
    const localizer = momentLocalizer(moment)
    return (
      <Calendar
        onSelectEvent={(o,e)=>console.log({o,e})}
        localizer={localizer} 
        events={this.state.events}
        style={{ height: 800 }}/>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(EventCalendar);
