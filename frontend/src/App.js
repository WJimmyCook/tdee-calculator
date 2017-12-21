import React, { Component } from 'react'
import Calendar from './components/Calendar'
import BodyStats from './components/BodyStats'
import Header from './components/Header'

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <BodyStats />
        <Calendar />
      </div>
    );
  }
}
