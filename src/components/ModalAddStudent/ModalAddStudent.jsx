import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import xlsxParser from 'xlsx-parse-json';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import './ModalAddStudent.scss';

class ModalAddStudent extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      currentPeriodId: null,
      selectedPeriod: "",
      studentList: []
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

  handleUpload = async(e) => {

    if(!e.target.files[0]) return true;

    try{
      let loadedFile = await xlsxParser.onFileSelection(e.target.files[0])
      if(loadedFile){
        let studentList = []
        
        for (const sheet in loadedFile) {
          if(loadedFile.hasOwnProperty(sheet))
          studentList = studentList.concat(loadedFile[sheet])
        }

        console.table(studentList)

        this.setState({studentList})
      }
    } catch(err) {
      alert(err)
    }
  }

  renderUploadForm = () => {
    return (
      <Form id="FormUploadStudent">
        <FormGroup>
          <Label for="studentList">Upload Student List</Label>
          <Input type="file" name="studentList" id="studentList" onChange={this.handleUpload}/>
        </FormGroup>
      </Form>
    )
  }

  renderStudentList = () => {
    
    const rowStudent = this.state.studentList.map((s, idx)=>{
      return (
        <tr key={idx}>
          <td> {s['StudentID']} </td>
          <td> {s['First Name']} </td>
          <td> {s['Middle Name']} </td>
          <td> {s['Last Name']} </td>
          <td> {s['Gender']} </td>
          <td> {s['Email']} </td>
          <td> {s['Contact']} </td>
        </tr>
      )
    })

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Student ID</th>

            <th>First Name</th>

            <th>Middle Name</th>

            <th>Last Name</th>

            <th>Gender</th>

            <th>Email</th>

            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {rowStudent}
        </tbody>

        
      </Table>
    )
  }

  saveStudent = async() => {
    const ResearchSectionId = this.props.section.id
    const enrollees = this.state.studentList.map((s, idx)=>{
      return {
        studentRefId: s['StudentID'],
        fName: s['First Name'],
        mName: s['Middle Name'],
        lName: s['Last Name'],
        email: s['Email'],
        contact: s['Contact'],
        gender: s['gender']
      }
    })

    try {
      let response = Promise.all(enrollees.map(async (enrollee) => {
        return await StoneApi.Section.addEnrollee(ResearchSectionId, enrollee)
      }))
      
      console.log({response})
      this.props.toggle()
      setTimeout(()=>window.location.reload(), 200)
    } catch(err) {
      console.error(err);
    }
    
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static" size="lg" fade={false}>
        <ModalHeader toggle={this.props.toggle}>{this.props.section.name}</ModalHeader>
        <ModalBody>
          { !this.state.studentList.length &&
            this.renderUploadForm()
          }

          { this.state.studentList.length>0 &&
            this.renderStudentList()
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveStudent}>Save Student</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalAddStudent);
