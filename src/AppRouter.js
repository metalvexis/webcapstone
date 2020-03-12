import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Home, Login } from 'screens';

import DevScreen from 'components/common/Dev/Dev.jsx';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route path="/home">
          <React.Fragment>
            <Home />
          </React.Fragment>
        </Route>

        <Route path="/login">
          <React.Fragment>
            <Login />
          </React.Fragment>
        </Route>

        <Route path="/dev/users">
          <DevScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;