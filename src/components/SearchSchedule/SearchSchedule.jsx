import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Col, Row, Label, Input,  } from 'reactstrap';

import FacultyCalendar from 'components/FacultyCalendar/FacultyCalendar.jsx'

import moment from 'moment'

import { StoneApi } from 'lib/StoneApi.js';

import './SearchSchedule.scss';

class SearchSchedule extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      facultyList:[],
      FacultyId: ""
    }
  }

  componentDidMount() {
    this.loadFacultyList()
  } 

  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)
  }

  loadFacultyList = async () => {
    const facultyList = await StoneApi.Faculty.getFaculties()

    this.setState({ facultyList })
  }

  facultyOptions = () => {
    const { facultyList } = this.state

    if(!facultyList) return [] 

    const options = facultyList.map((faculty,idx)=>{
      return (
        <option key={idx} value={faculty.id}>
          {faculty.fName} {faculty.lName}
        </option>
      )
    })

    return options
  }

  render() {
    return (
      <>
        <Col md={3}>
          <Label htmlFor="FacultyId">View Schedule of {' '}</Label>
          <Input type="select" name="FacultyId" id="FacultyId" value={this.state.FacultyId} onChange={this.handleInput}>
            {this.facultyOptions()}
          </Input>
        </Col>
        <Col md={9}>
          <FacultyCalendar FacultyId={this.state.FacultyId}/>
        </Col>
      </>
      
    );
  }
}

export default SearchSchedule;
