import React, { useState, useEffect } from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

function StudentProject(props) {

  let [ done, setDone ] = useState(null)
  let [ project, setProject ] = useState({
    title: "",
    abstract: ""
  })
  
  useEffect(() => {
    if(props.AuthContext.user && props.AuthContext.user.id){
      loadProject()
    }
  },[props.AuthContext])

  const loadProject = async() => {
    setDone(false)
    const studentId = props.AuthContext.user.id

    const projects = await StoneApi.Student.getProject(studentId)
    
    let project = projects.find(proj=>proj.status==="IP")

    if(project) {
      const { title, abstract } = project
      setProject({
        title, abstract
      })

      setDone(true)
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
        <h3>{project.title}</h3>
        <br/>
        <p>{project.abstract}</p>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const enhance = compose(withAuthContext);

export default enhance(StudentProject);