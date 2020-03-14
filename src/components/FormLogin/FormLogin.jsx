import React from 'react';

import { compose } from 'redux';

import { withRouter } from "react-router";

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './FormLogin.scss';

class FormLogin extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        email: '',
        password: ''
      };
    }
    
    login = async () => {
      const { email, password } = this.state;
      
      if(!email || !password) return false;
      
      const isCorrect = await this.props.AuthContext.login(email, password)
      
      if(!isCorrect) {
        console.log('Invalid Credentials, Try Again.')
        alert('Invalid Credentials, Try Again.')
      }else{
        this.props.history.push('/home');
      }
    }

    logout = async() => {
    }

    handleInput = (e) => {
      const name = e.target.name
      const val = e.target.value

      const update = {}

      

      update[name] = val

      this.setState(update)

    }

    render() {
      return (
        <Form id="FormLogin">
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.handleInput}/>
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.handleInput}/>
          </FormGroup>
          <Button outline block color="primary" onClick={this.login}>Login</Button>
        </Form>
      );
    }
}

const enhance = compose(withAuthContext, withRouter);

export default enhance(FormLogin);
