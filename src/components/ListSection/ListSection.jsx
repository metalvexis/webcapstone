import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import RowSection from './Section/Section.js';

import moment from 'moment';

import './ListSection.scss';

class ListSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sections: []
    };
  }

  async componentDidUpdate (prevProps) {
    if(this.props.AuthContext.user !== prevProps.AuthContext.user){
      this.loadSection()
    }
  }

  async componentDidMount () {
    if(this.props.AuthContext.user && this.props.AuthContext.user.id){
      this.loadSection()
    }
  }

  loadSection = async() => {
    const facultyId = this.props.AuthContext.user.id
    let researchSections = await StoneApi.Faculty.getSection(facultyId)

    const fetchedSection = await Promise.all(researchSections.map(async section => {
      const sectionId = section.id
      const s = await StoneApi.Section.fetchSection(sectionId)
      return s
    }))

    console.log({fetchedSection})
    this.setState({
      sections: fetchedSection
    })
  }

  renderSections = () => {
    return this.state.sections.map((section, idx)=>{
      return (
        <RowSection section={section} key={idx}/>
      )
    })
  }
  
  render() {
    return ( 
      <div id="ListSection">
        {this.renderSections()}
      </div>
     );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ListSection);
