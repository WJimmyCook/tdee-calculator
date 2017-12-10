import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';

const moment = extendMoment(Moment);

class Calendar extends React.Component {
  static defaultProps = {
    date: moment()
  };

  static propTypes = {
    date: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)

    this.days = this.days.bind(this)
  }

  days() {
    var days = []

    const dayRange = moment.range(
      moment(this.props.date).startOf('month').startOf('week'),
      moment(this.props.date).endOf('month').endOf('week')
    );
    for(let day of dayRange.by('days')){
      let belongsToAsideMonth = !day.isSame(moment(this.props.date), 'month')

      days.push(<li key={day.format('YYYYMMDD')} className={"day" + (belongsToAsideMonth ? ' pale' : '')}>{day.format('D')}</li>)
    }
    console.log("days", days);
    return days;
  }

  dayHeaders() {
    var dayHeaders = []

    const headers = moment.range(
      moment(this.props.date).startOf('week'),
      moment(this.props.date).endOf('week')
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
        <p className="monthHeader"><input value={this.props.date} onChange={this.props.onDateChange} /> — {moment(this.props.date).format('MMMM DD YYYY')}</p>
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

var store = createStore((state = moment().format('1977-02-13'), action) => {
  switch (action.type) {
    case 'INCREMENT_MONTH':
      return {date: moment(state.date).add(1, 'months')}
    case 'DECREMENT_MONTH':
      return {date: moment(state.date).subtract(1, 'months')}
    case 'CHANGE_DATE':
      console.log('CHANGE_DATE', action)
      return {date: action['date']}
    default:
      return state
  }
})

function render() {
  ReactDOM.render(
    <Calendar
      onMonthIncrement={() => store.dispatch({ type: 'INCREMENT_MONTH' })}
      onMonthDecrement={() => store.dispatch({ type: 'DECREMENT_MONTH' })}
      onDateChange={(e) => { store.dispatch({type: 'CHANGE_DATE', date: e.target.value}) }}
      {...store.getState()}
    />,
    document.getElementById('root')
  )
}

render()

store.subscribe(render)

registerServiceWorker();
