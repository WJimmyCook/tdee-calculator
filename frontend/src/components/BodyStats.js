import React from 'react'
import { targetDailyCalorieChange, currentWeight, weightChange,
  currentTDEE, goalWeightDate, timeUntilGoal, caloricNeed } from '../reducers'
import TextInput from '../components/TextInput'
import { updateInput } from '../actions/bodyStats'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class BodyStats extends React.Component {
  constructor(props){
    super(props);

    this.onInputChange = this.onInputChange.bind(this)
  }
  defaultProps = {
    goalWeightChangePerWeek: ''
  }

  onInputChange(event) {
    this.props.updateInput(event)
  }

  render() {
    const loseWeight = this.props.startingWeight > this.props.goalWeight
    const weightChangeLabel = loseWeight ? "Goal Weight Loss Per Week" : "Goal Weight Gain Per Week"
    const surplusOrDeficitLabel = loseWeight ? "Target Daily Deficit" : "Target Daily Surplus"
    const amountGainedOrLost = this.props.startingWeight > this.props.currentWeight ? "You've Lost" : "You've Gained"
    return (
      <div className="body-stats">
        <TextInput name="startingWeight" label="Starting Weight" value={this.props.startingWeight} onChange={this.onInputChange} />
        <TextInput name="goalWeight" label="Goal Weight" value={this.props.goalWeight} onChange={this.onInputChange} />
        <TextInput name="goalWeightChangePerWeek" label={weightChangeLabel} value={this.props.goalWeightChangePerWeek} onChange={this.onInputChange} />
        <div className="target-daily-calorie-change"><p>{surplusOrDeficitLabel}: {this.props.targetDailyCalorieChange}</p></div>
        <div className="current-weight"><p>Current Weight: {this.props.currentWeight}</p></div>
        <div className="weight-change"><p>{amountGainedOrLost}: {this.props.weightChange}</p></div>
        <div className="current-tdee"><p>Current TDEE: {this.props.currentTDEE}</p></div>
        <div className="goal-weight-date"><p>To reach your goal weight by {this.props.goalWeightDate} you will need to eat {this.props.caloricNeed} </p></div>
        <div className="time-until-goal-date">{this.props.timeUntilGoal} weeks until you reach your goal weight</div>
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    startingWeight: state.bodyStats.startingWeight,
    goalWeight: state.bodyStats.goalWeight,
    goalWeightChangePerWeek: state.bodyStats.goalWeightChangePerWeek,
    targetDailyCalorieChange: targetDailyCalorieChange(state),
    currentWeight: currentWeight(state),
    weightChange: weightChange(state),
    currentTDEE: currentTDEE(state),
    goalWeightDate: goalWeightDate(state),
    timeUntilGoal: timeUntilGoal(state),
    caloricNeed: caloricNeed(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateInput: bindActionCreators(updateInput, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BodyStats);
