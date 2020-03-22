import React, { useState, useEffect } from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import ProjectCard from '../ProjectCard/ProjectCard.js';

function StudentProject(props) {
  let [ project, setProject ] = useState(null)
  
  useEffect(() => {
    if(props.AuthContext.user && props.AuthContext.user.id){
      loadProject()
    }
  },[props.AuthContext])

  const loadProject = async() => {
    const studentId = props.AuthContext.user.id

    const projects = await StoneApi.Student.getProject(studentId)
    
    let project = projects.find(proj=>proj.status==="IP")

    if(project) {
      const projectId = project.id;
      const fetchedProject = await StoneApi.Project.fetchProject(projectId)
      
      setProject(fetchedProject)
    }
  }

  if(!project) return null
  
  return (
    <Col md={4}>
      <ProjectCard project={project} />
    </Col>
  )
}

const enhance = compose(withAuthContext);

export default enhance(StudentProject);