import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import './ModalCreateSchedule.scss';

class ModalCreateSchedule extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      eventTypes: [
        "Consultation",
        // "Defense"
      ],
      selectedEventType: "Consultation",
      dateTime: null,
      venue: 'JH24',
      recurring: 'once',
    };
  }

  async componentDidMount() {
  }
  

  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)
  }

  createShedule = async () => {
    setTimeout(()=>window.location.reload(), 200)
  }

  setDateTime = (dateTime) => {
    this.setState({ dateTime })
  }

  setRecurringDate = (recurring) => {
    this.setState({ recurring })
    
  }

  createSchedule = async () => {
    // FacultyId, dateTime, venue
    let FacultyId = this.props.AuthContext.user.id
    const { dateTime, venue } = this.state
    const response = await StoneApi.Schedule.createSchedule(FacultyId, dateTime, venue)

    console.log({createdSched: response})

    this.props.toggle()
  }

  renderEventTypes = () => {
    return this.state.eventTypes.map(event=><option key={event}>{event}</option>)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static" id="ModalCreateSchedule">
        <ModalHeader toggle={this.props.toggle}>New Event</ModalHeader>
        <ModalBody>
          <Form id="FormCreateShedule">
            <FormGroup row>
              <Label for="selectEvent" sm="4">Event</Label>
              <Col sm="6">
                <Input type="select" defaultValue={this.state.selectedEventType} name="select" id="selectEvent">
                  {this.renderEventTypes()}
                </Input>
              </Col>
              
            </FormGroup>

            <FormGroup row>
              <Label for="name" sm="4">Date and Time</Label>
              <div className="date-picker">
              <DatePicker 
                  selected={this.state.dateTime}
                  onChange={date => this.setDateTime(date)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={60}
                  timeCaption="Hour"
                  dateFormat="yyyy MM dd h:mm aa"
                  className="form-control "
                />
              </div>
              
            </FormGroup>

            <FormGroup row>
              <Label for="venue" sm="4">Venue</Label>
              <Col sm="6">
                <Input type="text" name="venue" id="venue" value={this.state.venue} onChange={this.handleInput}/>
              </Col>
            </FormGroup>


            {/* <FormGroup row>
              <Label for="venue" sm="4">Recurring</Label>
              <Col sm="6">
                <ButtonGroup size="sm">
                  <Button onClick={()=>{this.setRecurringDate('once')}}>Once</Button>
                  <Button onClick={()=>{this.setRecurringDate('weekdays')}}>Weekdays</Button>
                  <Button onClick={()=>{this.setRecurringDate('daily')}}>Weekly</Button>
                  <Button onClick={()=>{this.setRecurringDate('monthly')}}>Monthly</Button>
                </ButtonGroup>
              </Col>
            </FormGroup> */}
        
            
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createSchedule}>Save Event</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateSchedule);
