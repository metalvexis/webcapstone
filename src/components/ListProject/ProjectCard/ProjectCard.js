import React, { useState } from 'react';

import { Row, Col, Button } from 'reactstrap';

import './ProjectCard.scss';

import ModalProponent from 'components/ModalProponent/ModalProponent.jsx';

import ModalProject from 'components/ModalProject/ModalProject.jsx';

import ModalPanelist from 'components/ModalPanelist/ModalPanelist.jsx'

import ModalCreateDefense from 'components/ModalCreateDefense/ModalCreateDefense.jsx'

function ProjectCard(props) {
  const [isProponentModalOpen, setIsProponentModalOpen] = useState(false);
  const toggleProponentModal = () => setIsProponentModalOpen(!isProponentModalOpen);

  const [isPanelistModalOpen, setIsPanelistModalOpen] = useState(false);
  const togglePanelistModal = () => setIsPanelistModalOpen(!isPanelistModalOpen);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const toggleProjectModal = () => setIsProjectModalOpen(!isProjectModalOpen);

  const [isCreateDefenseModalOpen, setIsCreateDefenseModalOpen] = useState(false);
  const toggleDefenseModal = () => setIsCreateDefenseModalOpen(!isCreateDefenseModalOpen);

  const renderProponents = () => {
    const proponents = props.project.Students.map((proponent, idx) => {
      return (
        <div key={idx}>
          {proponent.fName} {proponent.lName}
        </div>
      )
    })

    return (
      <div>
        <strong>
          {proponents}
        </strong>
      </div>
    )
  }

  const renderPanelists = () => {
    if(!props.project.ProjectPanelists) return null

    let panelists = props.project.ProjectPanelists.map(panelist=>{
      return panelist.fName + ' ' + panelist.lName
    })

    return (
      <p>
        Panelists: {panelists.join(', ')}
      </p>
    
    )
    
  }

  return (
    <>
      <ModalProponent ResearchProjectId={props.project.id} isOpen={isProponentModalOpen} toggle={toggleProponentModal} />
      <ModalProject ResearchProjectId={props.project.id} isOpen={isProjectModalOpen} toggle={toggleProjectModal} />
      <ModalPanelist ResearchProjectId={props.project.id} isOpen={isPanelistModalOpen} toggle={togglePanelistModal} />
      <ModalCreateDefense ResearchProjectId={props.project.id} isOpen={isCreateDefenseModalOpen} toggle={toggleDefenseModal} />

      <div className="ProjectCard">
        <Row>
          <Col>
            <div className="ProjectCard--title" onClick={toggleProjectModal}>
              {props.project.title}
            </div>

            <div className="ProjectCard--proponents">
              {renderProponents()}
            </div>

            <div className="ProjectCard--abstract">
              ABSTRACT
              <p>{props.project.abstract}</p>
            </div>

            <div className="ProjectCard--adviser">
              <p>Adviser: {props.project.ProjectAdvisers[0].fName} {props.project.ProjectAdvisers[0].lName}</p>
            </div>

            <div className="ProjectCard--panelists">
              {renderPanelists()}
            </div>

            <div className="float-left" >
              {props.userType === "faculty" && 
                <Button size="sm" onClick={togglePanelistModal}>Panelists</Button>
              }
              {' '}
              <Button size="sm" onClick={toggleProponentModal}>Proponents</Button>
            </div>

            <div className="float-right" >
              <Button size="sm" onClick={toggleDefenseModal}>Schedule Defense</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProjectCard;