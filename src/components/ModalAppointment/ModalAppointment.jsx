import React from 'react';

import { Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

class ModalAppointment extends React.Component {
  constructor(props) {
    // props:
    // AppointmentId
    // ConsultationScheduleId
    super(props);
    
    this.state = {
      schedule: null,
      appointment: null,
      ResearchProjectId: null,
      concern: "",
      prerequisite: "",
      feedback: ""
    };
  }

  // componentDidMount() {
  //   if(this.props.ConsultationScheduleId){
  //     this.loadSchedule()
  //   }
  //   if(this.props.AppointmentId){
  //     this.loadSchedule()
  //   }
  // }


  componentDidUpdate(prevProps) {
    const hasConsultationScheduleId = prevProps.ConsultationScheduleId !== this.props.ConsultationScheduleId
    const hasAppointmentId = prevProps.AppointmentId !== this.props.AppointmentId
    if(hasConsultationScheduleId){
      this.loadSchedule()
    }
    if(hasAppointmentId){
      this.loadSchedule()
    }

  }

  async loadSchedule() {
    const isFaculty = this.isFaculty()

    if(isFaculty){
      this.loadAppointment()
    }else{
      this.initAppointment()
    }
  }

  async loadAppointment() {
    const AppointmentId = this.props.AppointmentId

    const appointment = await StoneApi.Appointment.fetchAppointment(AppointmentId)

    console.log({appointment})
    
    const schedule = appointment.ConsultationSchedule
    const project = appointment.ResearchProject

    const { 
      concern,
      prerequisite,
      feedback
    } = appointment

    this.setState({
      ResearchProjectId: project.id,
      appointment,
      schedule,
      concern,
      prerequisite,
      feedback
    })
  }

  async initAppointment() {
    const ConsultationScheduleId = this.props.ConsultationScheduleId

    const userId = this.props.AuthContext.user.id

    const projects = await StoneApi.Student.getProject(userId)
      
    let project = projects.find(proj=>proj.status==="IP")

    const schedule = await StoneApi.Schedule.fetchSchedule(ConsultationScheduleId)

    this.setState({
      schedule,
      ResearchProjectId: project.id
    })
  }

  isReadOnly = (field) => {
    const isFaculty = this.isFaculty()

    if(isFaculty) {
      if(field==="concern") return true
    } else {
      if(field==="prerequisite" || field==="feedback") return true
    }

    return false
  }

  isFaculty = () => {
    let userType = this.props.AuthContext.userType

    return userType === "faculty"
  }

  isAccepted = () => {
    const { appointment } = this.state

    return appointment.status === "Accepted"
  }

  isClosed = () => {
    const { appointment } = this.state

    return appointment.status === "Closed"
  }

  renderSubmit = () => {
    const isFaculty = this.isFaculty()
    
    if(isFaculty) {

      if(this.isAccepted()) {
        return (
          <Col md={12}>
            <Button block color="primary" onClick={this.setFeedback}>Save</Button>
          </Col>
        )
      }else{
        return (
          <Row>
            <Col md={6}>
              <Button block color="danger" onClick={()=>this.sendResponse("Rejected")}>Reject</Button>
            </Col>
  
            <Col md={6}>
              <Button block color="primary" onClick={()=>this.sendResponse("Accepted")}>Accept</Button>
            </Col>
          </Row>
        )
      }
      
    } else {
      return (
        <Col md={12}>
          <Button block color="primary" onClick={this.sendRequest}>Send</Button>
        </Col>
      )
      
    }
  }

  timeAndDate = () => {
    return moment(this.state.schedule.dateTime).format('LLLL')
  }

  sendRequest = async () => {
    const { ConsultationScheduleId } = this.props
    const { ResearchProjectId, concern } = this.state
    await StoneApi.Appointment.sendRequest(ResearchProjectId, ConsultationScheduleId, concern)
  }

  sendResponse = async (status) => {
    const { ResearchProjectId, schedule, prerequisite } = this.state
    const ConsultationScheduleId = schedule.id

    await StoneApi.Appointment.sendResponse(ResearchProjectId, ConsultationScheduleId, prerequisite, status)
  }

  setFeedback = async () => {
    const { ResearchProjectId, schedule, feedback } = this.state
    const ConsultationScheduleId = schedule.id

    await StoneApi.Appointment.setFeedback(ResearchProjectId, ConsultationScheduleId, feedback)
  }

  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)

  }

  render() {
    if(!this.state.schedule) return null

    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>Appointment</ModalHeader>
        <ModalBody>
          <div className="Appointment">
            <Form className="Appointment--scheduleInfo">
              <FormGroup>
                <Label>{'Time & Date'}</Label>
                <Input type="text" value={this.timeAndDate()} readOnly/>
              </FormGroup>
              <FormGroup>
                <Label>Venue</Label>
                <Input type="text" value={this.state.schedule.venue} readOnly/>
              </FormGroup>
              <FormGroup>
                <Label for="concern">Concern</Label>
                <Input 
                  type="textarea" 
                  placeholder="What is your concern?" 
                  rows={6} 
                  name="concern" 
                  id="concern" 
                  readOnly={this.isReadOnly('concern')}
                  value={this.state.concern}
                  onChange={this.handleInput}
                />
              </FormGroup>

              {
                this.isFaculty() &&
                <FormGroup>
                  <Label for="prerequisite">Pre-Requisites</Label>
                  <Input 
                    type="textarea" 
                    placeholder="What do the students need during consultation?" 
                    rows={6} 
                    name="prerequisite" 
                    id="prerequisite" 
                    readOnly={this.isReadOnly('prerequisite')}
                    value={this.state.prerequisite}
                    onChange={this.handleInput}
                  />
                </FormGroup>
              }

              {
                ( (this.isFaculty() && this.isAccepted())  || this.isClosed()) &&
                <FormGroup>
                  <Label for="feedback">Feedback</Label>
                  <Input 
                    type="textarea" 
                    placeholder="Advice and Recommendations during consultation." 
                    rows={6} 
                    name="feedback" 
                    id="feedback" 
                    readOnly={this.isReadOnly('feedback')}
                    value={this.state.feedback}
                    onChange={this.handleInput}
                  />
                </FormGroup>
              }

              
            </Form>
          </div>

          
          {this.renderSubmit()}
          
        </ModalBody>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalAppointment);
