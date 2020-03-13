import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

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
        "Defense"
      ],
      selectedEventType: "Consultation",
      dateTime: new Date(),
      room: 'JH24'
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

  renderEventTypes = () => {
    return this.state.eventTypes.map(event=><option>{event}</option>)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
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
              <DatePicker 
                  selected={this.state.dateTime}
                  onChange={date => this.setDateTime(date)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={60}
                  timeCaption="Hour"
                  dateFormat="yyyy MM dd h:mm aa"
                  className="form-control"
                />
              
            </FormGroup>

            
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createSection}>Save Event</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateSchedule);
