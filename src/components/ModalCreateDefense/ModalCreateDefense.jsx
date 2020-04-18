import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import _ from 'lodash'
import './ModalCreateDefense.scss';

class ModalCreateDefense extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      project: null, facultyList: [], panelists: [],
      venue: 'JH24',
      dateTime: new Date(),
      existingCriteria: [],
      criteria: [],
      category: 'title'
    };
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    const ResearchProjectId = this.props.ResearchProjectId
    const project = await StoneApi.Project.fetchProject(ResearchProjectId)
    const facultyList = await StoneApi.Faculty.getFaculties()
    const existingCriteria = await StoneApi.Criteria.fetchCriteria('')
    this.setState({ project, facultyList, panelists: project.ProjectPanelists, existingCriteria })
  }

  saveDefenseSchedule = async () => {
    let { panelists, criteria, dateTime, venue, category } = this.state
    const ResearchProjectId = this.props.ResearchProjectId
    const PanelistIds = panelists.map(panelist=>panelist.id)

    try {
      console.log({PanelistIds, ResearchProjectId})

      await StoneApi.GradingSheet.createGradingSheet(ResearchProjectId, PanelistIds, criteria)
      await StoneApi.Defense.createDefenseSchedule(ResearchProjectId, PanelistIds, dateTime, venue, category)

    } catch(err) {
      alert(err)
    }
  }

  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)

  }

  setDateTime = (date) => {
    this.setState({ dateTime: date })
  }

  addCriteria = () => {
    let { criteria } = this.state

    criteria.push({
      title: `New Criteria ${criteria.length}`,
      description: '',
      percentage: 1.0,
      sequence: criteria.length
    })

    this.setState({ criteria })
  }

  removeCriteria = (idx) => {
    let { criteria } = this.state

    if (idx > -1) {
      criteria.splice(idx, 1);
    }

    this.setState({ criteria })
  }

  renderPanelists = () => {
    let { panelists } = this.state

    if(!panelists.length) return <ListGroupItem>No Panelists</ListGroupItem>

    let list = panelists.map((panel, idx) => {
    return <ListGroupItem key={idx}>{idx+1}. {panel.fName} {panel.lName}</ListGroupItem>
    })

    return list
  }

  renderGradingSheetForm = () => {
    let { criteria } = this.state
    let criteriaList = criteria.map((criteria,idx) => {
      return (
        <Row key={idx}>
          <Col md={4} >
            <Input value={criteria.title} onChange={(e)=>editCriteria.bind(this, idx, 'title', e.target.value)()} />
          </Col>
          <Col md={5}>
            <Input type="textarea" rows={2} value={criteria.description} onChange={(e)=>editCriteria.bind(this, idx, 'description', e.target.value)()} />
          </Col>
          <Col md={2}>
            <Input value={criteria.percentage} onChange={(e)=>editCriteria.bind(this, idx, 'percentage', +e.target.value)()} />
          </Col>
          <Col md={1}>
            <Button block size="sm" color="danger" onClick={()=>this.removeCriteria(idx)}>
              X
            </Button>
          </Col>
        </Row>
      )
    })

    criteriaList.push(
      <Row key={criteria.length}>
        <Col md={12}>
          <Button outline block color="primary" size="sm" onClick={this.addCriteria} >Add Criteria</Button>{' '}
        </Col>
      </Row>
    )

    return (
      <>
        <Row>
          <Col md={4}>
            <strong>Title</strong>
          </Col>
          <Col md={5}>
            <strong>Description</strong>
          </Col>
          <Col md={2}>
            <strong>Percentage</strong>
          </Col>
          <Col md={1}>
            <strong>Action</strong>
          </Col>
        </Row>
        {criteriaList}
      </>
    )

    function editCriteria(idx, field, value){
      let { criteria } = this.state

      let target = criteria[idx]
      target[field] = value

      this.setState({ criteria })
    }
  }

  render() {
    if(!this.state.project) return null
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static" size="lg" id="ModalCreateDefense">
        <ModalHeader toggle={this.props.toggle}>Defense</ModalHeader>
        <ModalBody>
          <Form id="FormCreateDefense">
            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label for="project">Project</Label>
                  <Input type="email" name="project" id="project" placeholder="Project" value={this.state.project.title} readOnly/>
                </FormGroup>

                <FormGroup>
                  <Label>Panelists</Label>
                  <ListGroup className="FormCreateDefense__panelists">
                    { this.renderPanelists() }
                  </ListGroup>
                </FormGroup>

              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="venue">Defense Phase</Label>
                  <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleInput}>
                    <option value="title">Title Defense</option>
                    <option value="preliminary">Preliminary Defense</option>
                    <option value="final">Final Defense</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label>Date and Time</Label>
                  <div className="date-picker">
                  <DatePicker 
                      selected={this.state.dateTime}
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
                  <Input type="text" name="venue" id="venue" placeholder="Venue" value={this.state.venue} onChange={this.handleInput}/>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <h5>
                  <center>Grading Sheet</center>
                </h5>

                {this.renderGradingSheetForm()}
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveDefenseSchedule}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateDefense);
