import React, { useState } from 'react';

import { Row, Col, Button, Table } from 'reactstrap';

import ModalAddStudent from 'components/ModalAddStudent/ModalAddStudent.jsx';

const Section = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const renderEnrolleeTable = () => {
    if(!section.Students.length) {
      return (
        <p>No Enrollees</p>
      )
    }
    

    return (
      <Col md={10}>
        <EnrolleeTable enrollees={section.Students}/>
      </Col>
    )
  }
  return (
    <Row>
      <ModalAddStudent section={section} isOpen={isOpen} toggle={toggleModal}/>
      <Col md={12}>
        <div>
          <h4>{section.name} <Button onClick={toggleModal} size="sm">Add Student</Button></h4>
          
          {renderEnrolleeTable()}
        </div>
        <hr />
      </Col>
    </Row>
  );
}

export default Section;


const EnrolleeTable = ({ enrollees }) => {
  const rowErollee = enrollees.map((enrollee, idx)=>{
    return (
      <tr key={idx}>
        <td> {enrollee['studentRefId']} </td>
        <td> {enrollee['fName']} </td>
        <td> {enrollee['mName']} </td>
        <td> {enrollee['lName']} </td>
        <td> {enrollee['gender']} </td>
        <td> {enrollee['email']} </td>
        <td> {enrollee['contact']} </td>
      </tr>
    )
  })
  return (
    <Row>
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
          {rowErollee}
        </tbody>
      </Table>
    </Row>
  );
}
