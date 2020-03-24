import React, { useState } from 'react';

import { Col, Row, Button } from 'reactstrap';

import SearchSchedule from 'components/SearchSchedule/SearchSchedule.jsx';

import './Consult.scss';

function Consult(props) {

  return (
    <div className="ConsultScreen">
      <Col>
        <Row>
          <h2>Consult</h2>
        </Row>

        <Row>
          <SearchSchedule />
        </Row>
      </Col>
    </div>
  );
}

export default Consult;
