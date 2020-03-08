import React from 'react';

import FormLogin from 'components/FormLogin/FormLogin.jsx';

import { Col, Row } from 'reactstrap';

import './Login.scss';

function Login(props) {  
  return (
    <div className="LoginScreen">
      <Col>
        <Row>
        <FormLogin/>
        </Row>
      </Col>
      
    </div>
  );
}

export default Login;
