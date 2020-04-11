import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import './ModalCreateDefense.scss';

class ModalCreateDefense extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      project: null, facultyList: [], panelists: [],
      venue: 'JH24',
      datetime: new Date()

    };
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const ResearchProjectId = this.props.ResearchProjectId
    const project = await StoneApi.Project.fetchProject(ResearchProjectId)
    const facultyList = await StoneApi.Faculty.getFaculties()
    
    this.setState({ project, facultyList, panelists: project.ProjectPanelists })
  }

  setDateTime(date) {
    this.setState({ datetime: date })
  }

  renderPanelists() {
    let { panelists } = this.state

    if(!panelists.length) return <ListGroupItem>No Panelists</ListGroupItem>

    let list = panelists.map(panel => {
      return <ListGroupItem>{panel.fName} {panel.lName}</ListGroupItem>
    })

    return list
  }

  render() {
    if(!this.state.project) return null
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static" size="lg" id="ModalCreateDefense">
        <ModalHeader toggle={this.props.toggle}>Defense</ModalHeader>
        <ModalBody>
          <Form id="FormCreateDefense">
            <FormGroup>
              <Label for="project">Project</Label>
              <Input type="email" name="project" id="project" placeholder="Project" value={this.state.project.title} readOnly/>
            </FormGroup>

            <FormGroup>
              <Label>Panelists</Label>
              <ListGroup>
                { this.renderPanelists() }
              </ListGroup>
            </FormGroup>

            <FormGroup>
              <Label for="venue">Defense Phase</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option value="title">Title Defense</option>
                <option value="preliminary">Preliminary Defense</option>
                <option value="final">Final Defense</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Date and Time</Label>
              <div className="date-picker">
              <DatePicker 
                  selected={this.state.datetime}
                  onChange={date => this.setDateTime(date)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={30}
                  timeCaption="Starting"
                  dateFormat="yyyy MM dd h:mm aa"
                  className="form-control "
                />
              </div>
              
            </FormGroup>

            <FormGroup>
              <Label for="venue">Venue</Label>
              <Input type="text" name="venue" id="venue" placeholder="Venue" value={this.state.venue}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateDefense);
