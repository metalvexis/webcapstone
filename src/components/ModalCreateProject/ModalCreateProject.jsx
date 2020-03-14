import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import './ModalCreateProject.scss';

class ModalCreateProject extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: "",
      abstract: "",
      sectionId: ""
    };
  }

  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)
    
  }

  createProject = async () => {
    const { title, abstract } = this.state
    const StudentId = this.props.AuthContext.user.id
    const response = await StoneApi.Project.createProject([StudentId], title, abstract)

    console.log({createProjectResponse: response})
    this.props.toggle()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>New Project</ModalHeader>
        <ModalBody>
          <Form id="FormCreateProject">
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="abstract">Abstract</Label>
              <Input type="textarea" name="abstract" id="abstract" rows={4} value={this.state.abstract} onChange={this.handleInput}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createProject}>Save Project</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateProject);
