import React from 'react';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import Timer from 'components/common/Timer.js';

import './Sample.scss';

function Sample(props) {
  // localStorage.setItem('email', 'james@test.com');
  async function load() {
    const user = await props.AuthContext.loadUser()

    console.log(`LoadedUser`, user)
  }

  load()

  async function login() {
    const user = await props.AuthContext.login('james@test.com', '#Jams1994')

    console.log(`Loggedin`, user)
  }

  function logout() {
    props.AuthContext.logout()

    console.log(`Loggedout`)
  }
  
  return (
    <div className="HomeScreen">
      <button className="btn btn-primary" onClick={login}>Login</button>

      <button className="btn btn-danger" onClick={logout}>Logout</button>

      <Timer />
    </div>
  );
}

export default withAuthContext(Sample);
