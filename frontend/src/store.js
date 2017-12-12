import Moment from 'moment';
import { extendMoment } from 'moment-range';
import storage from 'redux-persist/es/storage'
import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createFilter   } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import { routerReducer } from 'react-router-redux';

const moment = extendMoment(Moment);

const calendarReducer = (state = {startDate: moment().format('MM-DD-YYYY')}, action) => {
  switch (action.type) {
    case 'INCREMENT_MONTH':
      console.log("INCREMENT_MONTH state", state)
      console.log("action", action)
      return {...state, startDate: moment(state.startDate).add(1, 'months').format('MM-DD-YYYY')}
    case 'DECREMENT_MONTH':
      return {startDate: moment(state.startDate).subtract(1, 'months').format('MM-DD-YYYY')}
    case 'CHANGE_START_DATE':
      return {startDate: action['startDate']}
    default:
      return state
  }
}

const reducers = combineReducers({
  calendarReducer
})

export default (history) => {
  const store = createStore(calendarReducer)
  store.subscribe(() => console.log("sribe state", store.getState()))

  return store
}
