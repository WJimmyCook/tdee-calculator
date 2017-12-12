import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';
import Day from './Day';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/fontawesome-free-solid';

const moment = extendMoment(Moment);

export default class Calendar extends React.Component {
  static defaultProps = {
    startDate: moment()
  };

  static propTypes = {
    startDate: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)

    this.days = this.days.bind(this)
  }

  days() {
    var days = []

    const dayRange = moment.range(
      moment(this.props.startDate).startOf('month').startOf('week'),
      moment(this.props.startDate).endOf('month').endOf('week')
    );
    for(let day of dayRange.by('days')){
      let belongsToAsideMonth = !day.isSame(moment(this.props.startDate), 'month')
      const element = <Day key={day.format('YYYYMMDD')} date={day} />
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
    // fetch('http://localhost:8000/entries/', {
    //   headers: {
    //     'Authorization': 'token 75fbf8e95ae2b8ded6335d08a802c85f32d9337d',
    //     'Access-Control-Allow-Origin': 'http://localhost:8000',
    //   }
    // })
    // .then(results => {
    //   return results.json();
    // }).then(data => {
    //   let entries = data.results.map((entry) => {
    //     return(
    //       <div key={entry.results}>
    //       <p>{entry.date}{entry.weight}</p>
    //       </div>
    //     )
    //   })
    //   this.setState({entry: entries});
    //   console.log("state", this.state.entries);
    // })
  }

  render() {
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
