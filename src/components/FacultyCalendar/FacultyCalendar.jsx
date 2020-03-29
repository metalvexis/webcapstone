import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import moment from 'moment'

import { StoneApi } from 'lib/StoneApi.js';

import './FacultyCalendar.scss';

class FacultyCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
  }

  async componentDidMount () {
    if(this.props.FacultyId) {
      this.updateEvents()
    }
    
  }

  async componentDidUpdate (prevProps) {
    if(prevProps.FacultyId !== this.props.FacultyId) {
      this.updateEvents()
    }
    
  }

  updateEvents = async () => {
    if(!this.props.FacultyId) {
      this.setState({ events: [] })
      return true
    }

    const schedules = await StoneApi.Faculty.getConsultationSchedule(this.props.FacultyId)

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

  onSelectEvent = (o, e) => {
    this.props.onSelectEvent(o, e);
  }

  render() {
    const localizer = momentLocalizer(moment)
    return (
      <Calendar
        onSelectEvent={(o,e)=>this.onSelectEvent(o,e)}
        localizer={localizer} 
        events={this.state.events}
        style={{ height: 800 }}/>
    );
  }
}

export default FacultyCalendar;
