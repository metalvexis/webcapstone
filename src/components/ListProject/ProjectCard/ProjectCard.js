import React from 'react';

import { Row, Col } from 'reactstrap';

import './ProjectCard.scss';

function ProjectCard(props) {
  
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
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProjectCard;