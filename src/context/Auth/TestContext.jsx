import React from 'react';

import { StoneApi } from 'lib/StoneApi.js';

export const TestContext = React.createContext('Test');

class TestProvider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        test: "TEST",
        field: "value"
      };
    }
    render() {
      return (
        <TestContext.Provider value={ this.state }>
          {this.props.children}
        </TestContext.Provider>
      );
    }
}
export default TestProvider;

export function withTestContext(Component) {
  return function WrapperComponent(props) {
    return (
      <TestContext.Consumer>
        {state => <Component {...props} TestContext={state} />}
      </TestContext.Consumer>
    );
  };
}