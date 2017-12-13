import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './App';
import { Route, Switch } from 'react-router';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';

// const store = configureStore()
//
// function render() {
//   ReactDOM.render(
//     <Calendar
//       onMonthIncrement={() => store.dispatch({ type: 'INCREMENT_MONTH' })}
//       onMonthDecrement={() => store.dispatch({ type: 'DECREMENT_MONTH' })}
//       onStartDateChange={(e) => { store.dispatch({type: 'CHANGE_START_DATE', startDate: e.target.value}) }}
//       {...store.getState()}
//     />,
//     document.getElementById('root')
//   )
// }
//
// render()
//
// store.subscribe(render)
//
// registerServiceWorker();

const history = createHistory()
const store = configureStore(history)

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login/" component={Login} />
        <PrivateRoute path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
