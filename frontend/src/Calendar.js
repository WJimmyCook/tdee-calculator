import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Redux from 'redux';
import PropTypes from 'prop-types';

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

      days.push(<li key={day.format('YYYYMMDD')} className={"day" + (belongsToAsideMonth ? ' pale' : '')}>{day.format('D')}</li>)
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

  render() {
    return (
      <div className="calendar">
        <div className="goPreviousMonth">
          <i className="icono-caretLeftCircle" onClick={this.props.onMonthDecrement} />
        </div>
        <p className="monthHeader"><input value={this.props.startDate} onChange={this.props.onStartDateChange} /> — {moment(this.props.startDate).format('MMMM DD YYYY')}</p>
        <div className="goNextMonth">
          <i className="icono-caretRightCircle" onClick={this.props.onMonthIncrement} />
        </div>
        <ul className="days">
          {this.dayHeaders()}
          {this.days()}
        </ul>
      </div>
    );
  }
}
