import * as entries from '../actions/calendar'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const initialState = {
    startDate: moment().format('MM-DD-YYYY')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_MONTH':
      return {...state, startDate: moment(state.startDate).add(1, 'months').format('MM-DD-YYYY')}
    case 'DECREMENT_MONTH':
      return {startDate: moment(state.startDate).subtract(1, 'months').format('MM-DD-YYYY')}
    case 'CHANGE_START_DATE':
      return {startDate: action['startDate']}
    default:
      return state
  }
}

export const calendarState = (state) => state.calendar
