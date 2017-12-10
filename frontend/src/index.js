import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import './index.css';
import '../node_modules/icono/dist/icono.min.css'
import registerServiceWorker from './registerServiceWorker';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';
import Calendar from './Calendar';

const moment = extendMoment(Moment);

var store = createStore((state = moment().format("MM DD YYYY"), action) => {
  switch (action.type) {
    case 'INCREMENT_MONTH':
      return {startDate: moment(state.startDate).add(1, 'months')}
    case 'DECREMENT_MONTH':
      return {startDate: moment(state.startDate).subtract(1, 'months')}
    case 'CHANGE_START_DATE':
      return {startDate: action['startDate']}
    default:
      return state
  }
})

function render() {
  ReactDOM.render(
    <Calendar
      onMonthIncrement={() => store.dispatch({ type: 'INCREMENT_MONTH' })}
      onMonthDecrement={() => store.dispatch({ type: 'DECREMENT_MONTH' })}
      onStartDateChange={(e) => { store.dispatch({type: 'CHANGE_START_DATE', startDate: e.target.value}) }}
      {...store.getState()}
    />,
    document.getElementById('root')
  )
}

render()

store.subscribe(render)

registerServiceWorker();
