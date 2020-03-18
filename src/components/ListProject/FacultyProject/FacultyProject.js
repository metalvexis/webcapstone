import React, { useState, useEffect } from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

function FacultyProject(props) {

  let [ projects, setProjects ] = useState([])
  
  useEffect(() => {
    if(props.AuthContext.user && props.AuthContext.user.id){
      loadProject()
    }
  },[props.AuthContext])

  const loadProject = async() => {
    const facultyId = props.AuthContext.user.id

    const projects = await StoneApi.Faculty.getProject(facultyId)

    console.log({projects})
    setProjects(projects)
  }

  const renderProjects = () => {
    if(!projects) return null
    return projects.map(p=>{
      return (
        <Row>
          <Col>
          <h3>{p.title}</h3>
          <br/>
          <p>{p.abstract}</p>
          </Col>
        </Row>
      )
    })
  }

  return (
    renderProjects()
  )
}

const enhance = compose(withAuthContext);

export default enhance(FacultyProject);