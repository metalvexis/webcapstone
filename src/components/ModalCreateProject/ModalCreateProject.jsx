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

  render() {
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>New Project</ModalHeader>
        <ModalBody>
          <Form id="FormCreateProject">
            <FormGroup>
              <Label for="name">Title</Label>
              <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInput}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createSection}>Save Project</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateProject);
