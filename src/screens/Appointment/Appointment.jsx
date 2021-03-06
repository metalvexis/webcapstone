import React, { useState, useEffect } from 'react';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Row, Button, Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js'

import ModalAppointment from 'components/ModalAppointment/ModalAppointment.jsx'

import moment from 'moment'

import './Appointment.scss';


function Appointment(props) {
  const [appointments, setAppointments] = useState([])
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [AppointmentId, setAppointmentId] = useState('')

  const toggleAppointmentModal = () => {
    setShowAppointmentModal(!showAppointmentModal);
  }

  const loadAppointments = async () => {
    const fetchedAppts = await StoneApi.Appointment.fetchAppointment('')
    setAppointments(fetchedAppts)
  }

  const onOpenAppt = (appointmentId) => {
    setAppointmentId(appointmentId)
    toggleAppointmentModal()
  }

  useEffect(() => {
    if(props.AuthContext.user && props.AuthContext.user.id){
      loadAppointments()
    }
  },[props.AuthContext])

  const renderAppointments = (status) => {
    if(!appointments) return (<p>No Appointment</p>)
    
    const toRender = appointments.filter(apt=>apt.status===status).map((apt,idx) => {
      const dateTime = moment(apt.ConsultationSchedule.dateTime).format('LLLL')
      return (
        <Col md={4} key={idx}>
          <Card>
            <CardBody>
              <CardTitle>
                <strong>{apt.ResearchProject.title}</strong>
              </CardTitle>
              <CardSubtitle>
                Due: {dateTime}
              </CardSubtitle>
              <CardText>
                Concern: <br/>
                {apt.concern}
              </CardText>

              <div>
                <Button size="sm" className="float-right" color="primary" onClick={()=>onOpenAppt(apt.id)}>
                  { status==="Pending" &&
                    "Respond"
                  }

                  { status==="Accepted" &&
                    "Start Consultation"
                  }

                  { status==="Closed" &&
                    "Review"
                  }
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })

    if(!toRender.length) return (<p>No Appointment</p>)

    return toRender
  }

  return (
    <>
      <ModalAppointment isOpen={showAppointmentModal} toggle={toggleAppointmentModal} AppointmentId={AppointmentId}/>
      <div className="AppointmentScreen">
        <Col>
          <Row>
            <h2>Appointment</h2>
          </Row>

          <Row>
            <Col md={10} className="appointment__entry">
              <h4>Pending Consultation Requests</h4>
              {renderAppointments("Pending")}
            </Col>
          </Row>

          <Row>
            <Col md={10} className="appointment__entry">
              <h4>Scheduled Consultations</h4>
              {renderAppointments("Accepted")}
            </Col>
          </Row>

          <Row>
            <Col md={10} className="appointment__entry">
              <h4>Consultations Conducted</h4>
              {renderAppointments("Closed")}
            </Col>
          </Row>
        </Col>
      </div>
    </>
    
  );
}

export default withAuthContext(Appointment);
