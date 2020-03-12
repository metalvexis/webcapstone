import React from 'react';

import { compose } from 'redux';

import { withRouter } from "react-router";

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Row, Table, Button } from 'reactstrap';

import './Dev.scss';

import { StoneApi } from 'lib/StoneApi.js'

class Dev extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      faculty: []
    };
    
  }

  async componentDidMount() {
    await this.props.AuthContext.loadUser();
    const faculty = await StoneApi.User.getFaculties();

    this.setState({
      faculty
    })
  }

  renderFaculty = () => {
    return this.state.faculty.map(u => {
      return (
        <tr>
          <td>{u.fName} {u.lName}</td>
          <td>{u.email}</td>
          <td>{this.renderRoles(u)}</td>
        </tr>
      )
    })
  }

  renderRoles = (user) => {
    const roles = ['dean', 'coordinator'];
    return roles.map(r => {
      let color = 'primary'; //user.roles.includes(r) ? 'success' : 'secondary';
      return (<Button color={color}>{r}</Button>)
    })
  }

  render() {
    return (
      <Col id="Dev" sm="12">
        <h1>User Management</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {this.renderFaculty()}
          </tbody>
        </Table>
      </Col>
    );
  }
}

const enhance = compose(withAuthContext, withRouter);

export default enhance(Dev);
