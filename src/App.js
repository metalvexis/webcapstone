import React from 'react';

import AuthContext from 'context/Auth/AuthContext.jsx';

import { Container, Col, Row } from 'reactstrap';

import './App.css';

import AppRouter from './AppRouter.js';

function App() {
  return (
    <AuthContext>
      <Container fluid={true}>
        <div className="App">
          <AppRouter />
        </div>
      </Container>
    </AuthContext>
  );
}

export default App;
