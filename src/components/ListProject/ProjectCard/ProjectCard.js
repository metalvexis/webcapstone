import React, { useState } from 'react';

import { Row, Col, Button } from 'reactstrap';

import './ProjectCard.scss';

import ModalProponents from 'components/ModalProponents/ModalProponents.jsx';

function ProjectCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

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
      <ModalProponents ResearchProjectId={props.project.id} isOpen={isOpen} toggle={toggleModal} />
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

            <div>
              <Button size="sm" className="float-right" onClick={toggleModal}>Edit Proponents</Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProjectCard;