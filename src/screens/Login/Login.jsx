import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';
import { withTestContext } from 'context/Auth/TestContext.jsx';

import './Login.scss';

function Login(props) {  
  return (
    <div className="HomeScreen">
    </div>
  );
}

const enhance = compose(withTestContext, withAuthContext);

export default enhance(Login)
