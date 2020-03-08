import React from 'react';

import { compose } from 'redux';

import { withRouter } from "react-router";

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import SideNavStudent from './Student/SideNavStudent.js'

import SideNavFaculty from './Faculty/SideNavFaculty.js'

import './SideNav.scss';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
    
  }

  async componentDidMount() {
    let user = await this.props.AuthContext.loadUser();

    if(!user){
      this.props.history.push('login')
    }
    
  }

  logout = async() => {
    this.props.history.push('/login')
  }

  render() {
    let user = this.props.AuthContext.user || null;

    return (
      <Col id="SideNav" sm="2">
      
        <Row className="SideNav--User">
          <div className="SideNav--UserInfo text-center">
            {
              user &&

              <h5>
                { user.fName + ' ' +  user.lName }
              </h5>
            }
          </div>
        </Row>
        <Row>
          <SideNavFaculty />
        </Row>
        <Button color="danger" outline block id="Button--Logout" onClick={this.logout}>Logout</Button>
      </Col>
    );
  }
}

const enhance = compose(withAuthContext, withRouter);

export default enhance(SideNav);
