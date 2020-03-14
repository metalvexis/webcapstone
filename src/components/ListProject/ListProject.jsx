import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import './ListProject.scss';

class ListProject extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: null,
      abstract: null,
      proponents: null,
      section: null,
      PeriodId: null
    };
  }

  async componentDidUpdate (prevProps) {
    if(this.props.AuthContext.user !== prevProps.AuthContext.user){
      this.loadProject()
    }
  }

  async componentDidMount () {
    if(this.props.AuthContext.user && this.props.AuthContext.user.id){
      this.loadProject()
    }
  }

  loadProject = async () => {
    const currentPeriod = await StoneApi.Period.getCurrentPeriod()

    const studentId = this.props.AuthContext.user.id

    const sections = await StoneApi.Student.getSection(studentId)

    const projects = await StoneApi.Student.getProject(studentId)

    console.log({projects})
    let project = projects.find(proj=>proj.status==="IP")

    if(project) {
      const { title, abstract } = project
      this.setState({
        title, abstract
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
          <h3>{this.state.title}</h3>
          <br/>
          <p>{this.state.abstract}</p>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ListProject);
