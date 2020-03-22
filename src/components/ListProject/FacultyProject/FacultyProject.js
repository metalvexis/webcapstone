import React, { useState, useEffect } from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Row, Col } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import ProjectCard from '../ProjectCard/ProjectCard.js';

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

    const fetchedProjects = []
    
    await Promise.all(
      projects.map(async project => {
        const fetchedProject = await StoneApi.Project.fetchProject(project.id)
        fetchedProjects.push(fetchedProject)
      })
    )

    console.log({projects})
    setProjects(fetchedProjects)
  }

  const renderProjects = () => {
    if(!projects) return null
    return projects.map((p, idx)=>{
      return (
        <Col key={idx} md={4}>
          <ProjectCard project={p} userType={props.AuthContext.userType}/>
        </Col>
      )
    })
  }

  return (
    renderProjects()
  )
}

const enhance = compose(withAuthContext);

export default enhance(FacultyProject);