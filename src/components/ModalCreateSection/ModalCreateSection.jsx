import React from 'react';

import { compose } from 'redux';

import { withAuthContext } from 'context/Auth/AuthContext.jsx';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { StoneApi } from 'lib/StoneApi.js';

import moment from 'moment';

import './ModalCreateSection.scss';

class ModalCreateSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      currentPeriodId: null,
      selectedPeriod: ""
    };
  }

  async componentDidMount() {
    const localMoment = moment
    const currentPeriod = await StoneApi.Period.getCurrentPeriod()
    const year1 = localMoment().year(currentPeriod.schoolYear).format('YYYY')
    const year2 = localMoment().year(currentPeriod.schoolYear).add(1,'y').format('YYYY')
    let sem = currentPeriod.semester;

    if(sem!=="summer") sem = sem === "1" ? "1st" : "2nd";

    this.setState({
      currentPeriodId: currentPeriod.id,
      selectedPeriod: `S/Y ${year1}-${year2} ${sem} Semester`
    })
  }

  handleInput = (e) => {
    const name = e.target.name
    const val = e.target.value

    const update = {}

    update[name] = val

    this.setState(update)

  }

  createSection = async () => {
    const { name, currentPeriodId } = this.state
    
    if(!name || !currentPeriodId) return false

    const FacultyId = this.props.AuthContext.user.id

    console.log({ createSection: {
      name, FacultyId, PeriodId: currentPeriodId
    }})

    const newSection = await StoneApi.Section.createSection(FacultyId, currentPeriodId, name)

    setTimeout(()=>window.location.reload(), 200)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} backdrop="static">
        <ModalHeader toggle={this.props.toggle}>New Section</ModalHeader>
        <ModalBody>
          <Form id="FormCreateSection">
            <FormGroup>
              <Label for="name">Section Name</Label>
              <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInput}/>
            </FormGroup>

            <FormGroup>
              <Label for="selectPeriod">Period</Label>
              <Input type="select" defaultValue={this.state.selectedPeriod} name="select" id="selectPeriod">
                <option>{this.state.selectedPeriod}</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.createSection}>Save Section</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const enhance = compose(withAuthContext);

export default enhance(ModalCreateSection);
