import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import './ListSection.scss';

class ListSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      researchSections: []
    };
  }

  async componentDidMount () {
    // StoneApi.Section.
  }


  render() {
    return (
      null
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ListSection);
