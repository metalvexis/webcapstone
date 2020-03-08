import React from 'react';

import AuthContext from 'context/Auth/AuthContext.jsx';
import TestContext from 'context/Auth/TestContext.jsx';

import './App.css';

import AppRouter from './AppRouter.js';

function App() {
  return (
    <TestContext>
      <AuthContext>
        <div className="App">
          <AppRouter />
        </div>
      </AuthContext>
    </TestContext>
  );
}

export default App;
