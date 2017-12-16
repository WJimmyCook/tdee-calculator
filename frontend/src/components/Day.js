import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Jumbotron, Form } from 'reactstrap';
import TextInput from './TextInput'
import { postEntryAction, updateEntryAction } from '../actions/entries'


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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onPostEntry() {
    console.log("day props", this.props)
    console.log("day state", this.state)
    if(this.props.id != null){
      console.log("PUT ran for id: " + this.props.id )
      console.log("props calories", this.props.calories)
      const weight = this.state.weight == null ? this.props.weight : this.state.weight
      const calories = this.state.calories == null ? this.props.calories : this.state.calories
      console.log("weight + calories", weight + calories)
      this.props.updateEntry(this.props.id, this.props.date, weight, calories)
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
            <TextInput
              name="weight"
              label="Weight"
              error={errors.weight}
              defaultValue={this.props.weight}
              value={this.state.weight}
              onChange={this.handleInputChange}/>
            <TextInput
              name="calories"
              label="Calories"
              error={errors.calories}
              defaultValue={this.props.calories}
              value={this.state.calories}
              onChange={this.handleInputChange}/>
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
    updateEntry: bindActionCreators(updateEntryAction, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Day);
