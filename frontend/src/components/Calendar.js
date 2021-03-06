import React from 'react';
import Moment from 'moment';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Jumbotron, Row, Col, Form } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';
import Day from './Day';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/fontawesome-free-solid';
import { entryAction, postEntryAction, updateEntryAction } from '../actions/entries'
import { serverMessageEntries } from '../reducers'
import { startDateChange, incrementMonth, decrementMonth } from '../actions/calendar';
import { connect } from 'react-redux'
import EntryForm from './EntryForm'
import PostEntry from '../containers/Entry'
import TextInput from './TextInput'
import Header from './Header'

const moment = extendMoment(Moment);

class Calendar extends React.Component {
  static defaultProps = {
    startDate: moment(),

    entries: []
  };

  static propTypes = {
    startDate: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedDay: moment()
    };

    // this.days = this.days.bind(this)
    // this.onDayButtonClick = this.onDayButtonClick.bind(this)
    // this.onPostEntry = this.onPostEntry.bind(this)
  }


  days() {
    var days = []

    const dayRange = moment.range(
      moment(this.props.startDate).startOf('month').startOf('week'),
      moment(this.props.startDate).endOf('month').endOf('week')
    );

    // this.props.entries.entries.map((entry) => console.log("entry ", entry))
    let index = 0
    for(let day of dayRange.by('days')){
      index++
      const weight = null
      const calories = null
      const id = null
      if(this.props.entries.length > 0){
        const newEntry = this.props.entries.map(entry => {
          if(entry['date'] === day.format("YYYY-MM-DD")){
            weight = entry['weight']
            calories = entry['calories']
            id = entry['id']
          }
        })
      }
      let belongsToAsideMonth = !day.isSame(moment(this.props.startDate), 'month')
      const element = <Day date={day.format("YYYY-MM-DD")} weight={weight} calories={calories} id={id} key={day.format('YYYY-MM-DD')} className={"day" + ( belongsToAsideMonth ? ' .pale' : '')} />
      days.push(element)
    }
    return days;
  }

  dayHeaders() {
    var dayHeaders = []

    const headers = moment.range(
      moment(this.props.startDate).startOf('week'),
      moment(this.props.startDate).endOf('week')
    );
    for(let header of headers.by('days')){
      dayHeaders.push(<li key={header.format('YYYYMMDD')} className="dayHeader">{header.format('ddd')}</li>)
    }

    return dayHeaders;
  }


  componentDidMount(){
    this.props.getEntries()
  }

  onStartDateChange() {
    this.props.startDateChange()
  }

  onMonthDecrement() {
    this.props.decrementMonth()
  }

  onMonthIncrement() {
    this.props.incrementMonth()
  }

  render() {
    const errors = this.props.errors || {}
    console.log("Calendar props", this.props)
    return (
      <Container className="calendar">
        <Row>
          <Col className="goPreviousMonth">
          <FontAwesomeIcon className="align-middle" icon={faChevronCircleLeft} size="lg" onClick={this.props.onMonthDecrement} />
          </Col>
          <Col className="monthHeader">
          {moment(this.props.startDate).format('MMMM YYYY')}
          </Col>
          <Col className="goNextMonth">
          <FontAwesomeIcon icon={faChevronCircleRight} size="lg" onClick={this.props.onMonthIncrement} />
          </Col>
        </Row>
        <div className="days">
          {this.dayHeaders()}
          {this.days()}
        </div>
        <Modal isOpen={this.state.modal} toggle={this.onDayButtonClick} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.selectedDay}
          </ModalHeader>
          <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <h1>Create Entry</h1>
            {errors.non_field_errors?<Alert color="danger">{errors.non_field_errors}</Alert>:""}
            <TextInput name="weight" label="Weight" error={errors.weight} getRef={input => this.primaryInput = input} onChange={this.handleInputChange}/>
            <TextInput name="calories" label="Calories" error={errors.calories} onChange={this.handleInputChange}/>
            <Button type="submit" color="primary" size="lg">Submit</Button>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onPostEntry}>Save</Button>{' '}
            <Button color="secondary" onClick={this.onDayButtonClick}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    startDate: state.calendar.startDate,
    entries: state.entries
   }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onMonthDecrement: bindActionCreators(decrementMonth , dispatch),
    onMonthIncrement: bindActionCreators(incrementMonth , dispatch),
    onStartDateChange: bindActionCreators(startDateChange, dispatch),
    getEntries: bindActionCreators(entryAction, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
