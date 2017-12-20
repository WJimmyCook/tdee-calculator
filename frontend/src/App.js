import React, { Component } from 'react'
import Calendar from './components/Calendar'
import BodyStats from './components/BodyStats'

export default class App extends Component {

  render() {
    return (
      <div>
        <BodyStats />
        <Calendar />
      </div>
    );
  }
}
