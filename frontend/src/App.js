import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Calendar from './components/Calendar';
import { entryAction } from './actions/entries';
import { serverMessage, serverMessageEntries } from './reducers';
import store from './store';


export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h2>TDEE Calculator</h2>
        <Calendar />
      </div>
    );
  }
}
