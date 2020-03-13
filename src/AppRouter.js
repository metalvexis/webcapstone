import React from 'react';

import { compose } from 'redux';

import { withRouter } from "react-router";

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Home, Login } from 'screens';

import DevScreen from 'components/common/Dev/Dev.jsx';

class AppRouter extends React.Component {
  async componentDidMount() {
    await this.props.AuthContext.loadUser()
  }

  render() {
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
    )
  }
}

const enhance = compose(withAuthContext);


export default enhance(AppRouter);