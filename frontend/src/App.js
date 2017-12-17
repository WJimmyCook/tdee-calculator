import React, { Component } from 'react'
import Calendar from './components/Calendar'
import BodyStats from './components/BodyStats'

export default class App extends Component {

  render() {
    return (
      <div>
        <h2>TDEE Calculator</h2>
        <BodyStats />
        <Calendar />
      </div>
    );
  }
}
