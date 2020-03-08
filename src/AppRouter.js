import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home, Login } from 'screens';
import Sample from 'components/common/Sample/Sample.jsx';
/*
  Configure this component to map screens to routes
*/

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
      </Switch>
    </Router>
  );
}

export default AppRouter;