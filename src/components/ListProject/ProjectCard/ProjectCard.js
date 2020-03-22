import React, { useState } from 'react';

import { Row, Col, Button } from 'reactstrap';

import './ProjectCard.scss';

import ModalProponents from 'components/ModalProponents/ModalProponents.jsx';

import ModalProject from 'components/ModalProject/ModalProject.jsx';

function ProjectCard(props) {
  const [isProponentModalOpen, setIsProponentModalOpen] = useState(false);
  const toggleProponentModal = () => setIsProponentModalOpen(!isProponentModalOpen);

  const [isPanelistModalOpen, setIsPanelistModalOpen] = useState(false);
  const togglePanelistModal = () => setIsPanelistModalOpen(!isPanelistModalOpen);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const toggleProjectModal = () => setIsProjectModalOpen(!isProjectModalOpen);

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

  return (
    <>
      <ModalProponents ResearchProjectId={props.project.id} isOpen={isProponentModalOpen} toggle={toggleProponentModal} />
      <ModalProject ResearchProjectId={props.project.id} isOpen={isProjectModalOpen} toggle={toggleProjectModal} />
      <div className="ProjectCard">
        <Row>
          <Col>
            <div className="ProjectCard--title">
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

            <div className="float-left" >
              {props.userType === "faculty" && 
                <Button size="sm" onClick={togglePanelistModal}>Panelists</Button>
              }
              {' '}
              <Button size="sm" onClick={toggleProponentModal}>Proponents</Button>
            </div>

            <div className="float-right" >
              <Button size="sm" onClick={toggleProjectModal}>Details</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProjectCard;