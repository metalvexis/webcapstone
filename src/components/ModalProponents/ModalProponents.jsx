import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import './ModalProponents.scss';

class ModalProponents extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      project: null,
      ResearchSectionId: "",
      studentList: [],
      proponents: []
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
    const ResearchProjectId = this.props.ResearchProjectId
    const project = await StoneApi.Project.fetchProject(ResearchProjectId)
    const studentId = project.Students[0].id
    const section = await StoneApi.Student.getSection(studentId)
    const studentList = await StoneApi.Section.getEnrollee(section[0].id)
    
    this.setState({ project, ResearchSectionId: section[0].id, studentList, proponents: project.Students })
  }

  setProponent = async (userId) => {
    let { studentList, proponents } = this.state

    const isProponent = this.isProponent(userId)

    if(isProponent){
      proponents = proponents.filter(p=>p.id!==userId)
    }else{
      const s = studentList.find(student=>student.id===userId)

      if(s){
        proponents.push(s)
      }
    }

    this.setState({ proponents })
  }

  isProponent = (userId) => {
    const { proponents } = this.state

    return proponents.find(p=>p.id===userId) || false
  }

  proponentOptions = () => {
    const { studentList } = this.state

    if(!studentList) return [] 

    const options = studentList.map((student,idx)=>{
      return (
        <FormGroup check key={idx}>
          <Label check>
            <Input type="checkbox" checked={this.isProponent(student.id)} onChange={()=>this.setProponent(student.id)}/>{' '}
            {student.fName} {student.lName}
          </Label>
        </FormGroup>
      )
    })

    return options
  }

  saveProponent = async () => {
    const { proponents } = this.state

    const StudentIds = proponents.map(p=>p.id)

    await StoneApi.Project.setProponent(this.props.ResearchProjectId, StudentIds)
    try {
      await Promise.all(
        proponents.map(async p=>{
          
        })
      )
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { project } = this.state
    if(!project) return null
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>{project.title}</ModalHeader>
        <ModalBody>
          <div className="Proponents">
            <h5>Proponents</h5>
            <Form className="Proponents--studentList">
              {this.proponentOptions()}
            </Form>
          </div>
          
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.saveProponent}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalProponents);
