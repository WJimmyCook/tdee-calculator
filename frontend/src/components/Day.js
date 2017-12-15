import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { weightChange } from '../actions/entry';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const moment = extendMoment(Moment);

class Day extends React.Component {
  static defaultProps = {
    weight: "",
    calories: ""
  }

  constructor(props){
    super(props);

    // this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    date: PropTypes.object,
    weight: PropTypes.number,
    calories: PropTypes.number
  };

  onWeightChange(){
    console.log("Day changed")
    this.props.weightChange()

    console.log("weight", this.props.weight)
    console.log("calories", this.props.calories)

    // if(this.props.weight != null && this.props.calories != null){
    //   this.props.postEntryAction(this.props.date, this.props.weight, this.props.calories)
    // }
  }

  render(){
    return (
      <div className="day">
        <div className="date">
          <div>{moment(this.props.date).format('D')}</div>
        </div>
        <div className="weight">
          <input value={this.props.weight} onChange={this.props.onWeightChange}/>
        </div>
        <div className="calories">
          <input value={this.props.calories} onChange={this.props.handleChange}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entry: state.entry[ownProps.date]
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onWeightChange: bindActionCreators(weightChange, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Day)
