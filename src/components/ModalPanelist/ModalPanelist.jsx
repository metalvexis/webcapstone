import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import './ModalPanelist.scss';

class ModalPanelist extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      project: null,
      ResearchSectionId: "",
      facultyList: [],
      panelists: []
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
    const facultyList = await StoneApi.Faculty.getFaculties()
    
    this.setState({ project, facultyList, panelists: project.ProjectPanelists })
  }

  setPanelist = async (userId) => {
    let { facultyList, panelists } = this.state

    const isProponent = this.isPanelist(userId)

    if(isProponent){
      panelists = panelists.filter(p=>p.id!==userId)
    }else{
      const s = facultyList.find(student=>student.id===userId)

      if(s){
        panelists.push(s)
      }
    }

    this.setState({ panelists })
  }

  isPanelist = (userId) => {
    const { panelists } = this.state

    return panelists.find(p=>p.id===userId) || false
  }

  panelistOptions = () => {
    const { facultyList } = this.state

    if(!facultyList) return [] 

    const options = facultyList.map((faculty,idx)=>{
      return (
        <FormGroup check key={idx}>
          <Label check>
            <Input type="checkbox" checked={this.isPanelist(faculty.id)} onChange={()=>this.setPanelist(faculty.id)}/>{' '}
            {faculty.fName} {faculty.lName}
          </Label>
        </FormGroup>
      )
    })

    return options
  }

  savePanelist = async () => {
    const { panelists } = this.state

    const FacultyIds = panelists.map(p=>p.id)
    
    StoneApi.Faculty.setPanelist(FacultyIds, this.props.ResearchProjectId)
  }

  render() {
    const { project } = this.state
    if(!project) return null
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>{project.title}</ModalHeader>
        <ModalBody>
          <div className="Panelist">
            <h5>Panelists</h5>
            <Form className="Panelist--facultyList">
              {this.panelistOptions()}
            </Form>
          </div>
          
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.savePanelist}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalPanelist);
