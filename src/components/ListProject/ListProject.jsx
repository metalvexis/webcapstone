import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import FacultyProject from './FacultyProject/FacultyProject.js';

import StudentProject from './StudentProject/StudentProject.js';

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

  renderProject = () => {
    if (this.props.AuthContext.userType === "faculty") {
      return <FacultyProject/>
    } else if (this.props.AuthContext.userType === "student") {
      return <StudentProject/>
    }
    return null
  }

  render() {
    return (
     this.renderProject()
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ListProject);
