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
      FacultyId: "",
      facultyList: []
    };
  }

  componentDidMount() {
    if(this.props.AuthContext.user){
      this.loadData()  
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.AuthContext.user !== this.props.AuthContext.user){
      this.loadData()  
    }
  }

  async loadData() {
    
    const userId = this.props.AuthContext.user.id
    const facultyList = await StoneApi.Faculty.getFaculties()
    
    this.setState({ facultyList })
  }
  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)
    
  }

  createProject = async () => {
    const { title, abstract, FacultyId } = this.state
    const StudentId = this.props.AuthContext.user.id
    const ResearchProject = await StoneApi.Project.createProject([StudentId], title, abstract)
    const ResearchProject_id = ResearchProject.id

    console.log({ResearchProject_id, FacultyId})

    const Adviser = await StoneApi.Faculty.setAdviser(FacultyId, ResearchProject_id)

    console.log({ResearchProject, Adviser})
    this.props.toggle()
  }

  adviserOptions = () => {
    const { facultyList } = this.state

    if(!facultyList) return [] 

    const options = facultyList.map((f,idx)=>{
      return (
        <option key={idx} value={f.id}>
          {f.fName} {f.lName}
        </option>
      )
    })

    return options
  }

  proponentOptions = () => {
    
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
              <Label for="FacultyId">Adviser</Label>
              <Input type="select" name="FacultyId" id="FacultyId" value={this.state.FacultyId} onChange={this.handleInput}>
                {this.adviserOptions()}
              </Input>
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
