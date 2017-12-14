import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default class Day extends React.Component {
  constructor(props){
    super(props);


    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    date: PropTypes.object,
    weight: PropTypes.number,
    calories: PropTypes.number
  };

  handleChange(event){
    // this.setState({value: event.target.value})
  }

  render(){
    return (
      <div className="day">
        <div className="date">
          <div>{moment(this.props.date).format('D')}</div>
        </div>
        <div className="weight">
          <input value={this.props.weight} onChange={this.handleChange}/>
        </div>
        <div className="calories">
          <input value={this.props.calories} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}
