import React from 'react';
import Moment from 'moment';
import { bindActionCreators } from 'redux';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';
import Day from './Day';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/fontawesome-free-solid';
import { entryAction } from '../actions/entries'
import { serverMessageEntries } from '../reducers'
import { startDateChange, incrementMonth, decrementMonth } from '../actions/calendar';
import { connect } from 'react-redux'

const moment = extendMoment(Moment);

class Calendar extends React.Component {
  static defaultProps = {
    startDate: moment(),
    entries: {entries:[{}]}
  };

  static propTypes = {
    startDate: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)

    this.days = this.days.bind(this)
    // this.onStartDateChange = this.onStartDateChange.bind(this)
    // this.getEntries = this.getEntries.bind(this)
  }

  days() {
    var days = []

    const dayRange = moment.range(
      moment(this.props.startDate).startOf('month').startOf('week'),
      moment(this.props.startDate).endOf('month').endOf('week')
    );

    // this.props.entries.entries.map((entry) => console.log("entry ", entry))

    for(let day of dayRange.by('days')){
      const weight = null
      const calories = null
      if(this.props.entries.entries){
        const newEntry = this.props.entries.entries.map(entry => {
          if(entry['date'] === day.format("YYYY-MM-DD")){
            weight = entry['weight']
            calories = entry['calories']
          }
        })
      }
      let belongsToAsideMonth = !day.isSame(moment(this.props.startDate), 'month')
      const element = <Day key={day.format('YYYYMMDD')} date={day.format("YYYY-MM-DD")} weight={weight} calories={calories}/>
      // days.push(<li key={day.format('YYYYMMDD')} className={"day" + (belongsToAsideMonth ? ' pale' : '')}>{day.format('D')}</li>)
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
      dayHeaders.push(<li key={header.format('YYYYMMDD')} className="dayHeader">{header.format('dd')}</li>)
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
    console.log("Calendar props", this.props)
    return (
      <div className="calendar">
        <div className="goPreviousMonth">
        <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" onClick={this.props.onMonthDecrement} />
        </div>
        <p className="monthHeader"><input value={this.props.startDate} onChange={this.props.onStartDateChange} /> — {moment(this.props.startDate).format('MMMM DD YYYY')}</p>
        <div className="goNextMonth">
        <FontAwesomeIcon icon={faChevronCircleRight} size="lg" onClick={this.props.onMonthIncrement} />
        </div>
        <ul className="days">
          {this.dayHeaders()}
          {this.days()}
        </ul>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return { entries: state.entries }
// }
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ fetchEntries: entryAction }, dispatch)
// }
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
