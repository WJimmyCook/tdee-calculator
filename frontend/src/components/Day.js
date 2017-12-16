import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Jumbotron, Form } from 'reactstrap';
import TextInput from './TextInput'
import { postEntryAction, updateWeight } from '../actions/entries'


const moment = extendMoment(Moment);

class Day extends React.Component {
  static defaultProps = {
    weight: "",
    calories: ""
  }

  constructor(props){
    super(props);
    this.state = {
      modal: false
    }

    this.onDayButtonClick = this.onDayButtonClick.bind(this)
    this.onPostEntry = this.onPostEntry.bind(this)

  }

  static propTypes = {
    date: PropTypes.object,
    weight: PropTypes.number,
    calories: PropTypes.number
  };

  onDayButtonClick() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPostEntry() {
    console.log("day props", this.props)
    if(this.props.id != null){
      // edit here
    } else {
      this.props.postEntry(this.props.date, this.state.weight, this.state.calories)
    }

    this.setState({
      modal: !this.state.modal
    })
  }

  render(){
    const date = moment(this.props.date)
    const errors = this.props.errors || {}
    return (
      <div className="day">
        <Button key={date.format('YYYYMMDD')} onClick={this.onDayButtonClick}>
          {date.format("D")}
          <p>{this.props.weight} {this.props.weight? '-' : ''} {this.props.calories}</p>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.onDayButtonClick} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.selectedDay}</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <h1>Create Entry</h1>
            {errors.non_field_errors?<Alert color="danger">{errors.non_field_errors}</Alert>:""}
            <TextInput name="weight" label="Weight" error={errors.weight} value={this.props.weight} getRef={input => this.primaryInput = input} onChange={this.handleInputChange}/>
            <TextInput name="calories" label="Calories" error={errors.calories} value={this.props.calories} onChange={this.handleInputChange}/>
            <TextInput name="id" defaultValue={this.props.id} hidden/>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onPostEntry}>Save</Button>{' '}
            <Button color="secondary" onClick={this.onDayButtonClick}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries
   }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postEntry: bindActionCreators(postEntryAction, dispatch),
    updateWeight: bindActionCreators(updateWeight, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Day);
