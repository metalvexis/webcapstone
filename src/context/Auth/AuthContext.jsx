import React from 'react';

import { StoneApi } from 'lib/StoneApi.js';

export const AuthContext = React.createContext('Auth');

class AuthProvider extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        user: null,
        userType: null,
        roles: null,
        isLoggedIn: false
      };
    }
    
    login = async (email, password) => {
      const { isValidLogin, user, userType, roles } = await StoneApi.Auth.login(email, password);
      localStorage.removeItem('email');
      
      if( !isValidLogin ){
        return false;
      }

      localStorage.setItem('email', email);
    
      this.setState({ user, roles, userType, isLoggedIn: true });

      return user;
    }

    loadUser = async() => {
      const email = localStorage.getItem('email');
      if( email ){
        let user = await StoneApi.User.getUser(email);

        if(!user[0]){
          return this.setState({ user: null, isLoggedIn: false });  
        }

        user = user[0];

        this.setState({ user, isLoggedIn: true });
        return user
      }
      return null;
    }

    logout = async() => {
      localStorage.removeItem('email');
      this.setState({ user: null, userType: null, roles: null, isLoggedIn: false });
    }

    render() {
      const value = { 
        ...this.state, 
        loadUser: this.loadUser,
        login: this.login, 
        logout: this.logout
      }
      return (
        <AuthContext.Provider value={ value }>
          {this.props.children}
        </AuthContext.Provider>
      );
    }
}
export default AuthProvider;

export function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthContext.Consumer>
        {state => <Component {...props} AuthContext={state} />}
      </AuthContext.Consumer>
    );
  };
}