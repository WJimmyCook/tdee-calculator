import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Calendar from './Calendar';
import configureStore from './store';

const store = configureStore()

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
