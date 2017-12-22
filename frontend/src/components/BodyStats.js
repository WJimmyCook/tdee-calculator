import React from 'react'
import { targetDailyCalorieChange, currentWeight, weightChange,
  currentTDEE, goalWeightDate, timeUntilGoal, caloricNeed, userId } from '../reducers'
import TextInput from '../components/TextInput'
import { updateInput, updateProfile, getProfileStats } from '../actions/bodyStats'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Form, Container, Input, Label, FormGroup, Progress } from 'reactstrap'

class BodyStats extends React.Component {
  constructor(props){
    super(props);

    this.onInputChange = this.onInputChange.bind(this)
  }
  defaultProps = {
    goalWeightChangePerWeek: ''
  }

  componentDidMount(){
    this.props.getProfileStats(this.props.userId)
  }

  onInputChange(event) {
    console.log("propszzz", event.target.name)
    this.props.updateProfile(this.props.userId, event)
    // this.props.updateInput(event)
  }

  render() {
    const loseWeight = this.props.startingWeight > this.props.goalWeight
    const weightChangeLabel = loseWeight ? "Goal Weight Loss Per Week" : "Goal Weight Gain Per Week"
    const surplusOrDeficitLabel = loseWeight ? "Target Daily Deficit" : "Target Daily Surplus"
    const amountGainedOrLost = this.props.startingWeight > this.props.currentWeight ? "You've Lost" : "You've Gained"
    const hittingGoal = loseWeight && this.props.currentWeight < this.props.startingWeight ||
    !loseWeight && this.props.currentWeight > this.props.startingWeight
    return (
      <Container className="bodyStats">
        <div className="time-until-goal-date text-center"><span className="body-stat-value">{this.props.timeUntilGoal}</span> weeks until you reach your goal weight</div>
          <Progress multi>
            <Progress bar value={this.props.startingWeight} max={this.props.goalWeight}>starting weight - {this.props.startingWeight}</Progress>
            <Progress bar color="success" value={this.props.currentWeight - this.props.startingWeight} max={this.props.goalWeight}></Progress>
          </Progress>
        <Row>
          <Col sm="5" className="bodyStatsInput">
              <Row>
                <Label for="startingWeightInput" sm={6}>Starting Weight</Label>
                <Col sm={6}>
                  <Input id="startingWeightInput" className="bodyStatsInputValue" name="startingWeight" value={this.props.startingWeight} onChange={this.onInputChange} />
                </Col>
              </Row>
              <Row>
                <Label for="goalWeightInput" sm={6}>Goal Weight</Label>
                <Col sm={6}>
                  <Input id="goalWeightInput" name="goalWeight" value={this.props.goalWeight} onChange={this.onInputChange} />
                </Col>
              </Row>
              <Row>
                <Label for="goalWeightChangePerWeekInput" sm={6}>{weightChangeLabel}</Label>
                <Col sm={6}>
                  <Input id="goalWeightChangePerWeekInput" name="goalWeightChangePerWeek" value={this.props.goalWeightChangePerWeek} onChange={this.onInputChange} />
                </Col>
              </Row>
          </Col>
          <Col sm="7">
            <div className="current-weight">Current Weight: <span className={"body-stat-value" + ( hittingGoal ? " hitting-goal" : " failing-goal")}>{this.props.currentWeight}</span></div>
            <div className="weight-change">{amountGainedOrLost}: <span className={"body-stat-value" + ( hittingGoal ? " hitting-goal" : " failing-goal")}>{this.props.weightChange}</span></div>
            <div className="target-daily-calorie-change">{surplusOrDeficitLabel}: <span className="body-stat-value">{this.props.targetDailyCalorieChange}</span></div>
            <div className="current-tdee">Current TDEE: <span className="body-stat-value">{this.props.currentTDEE}</span></div>
            <div className="goal-weight-date">To reach your goal weight by <span className="body-stat-value">{this.props.goalWeightDate}</span> you will need to eat <span className="body-stat-value">{this.props.caloricNeed}</span></div>
          </Col>
        </Row>
      </Container>
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
    caloricNeed: caloricNeed(state),
    userId: userId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateInput: bindActionCreators(updateInput, dispatch),
    updateProfile: bindActionCreators(updateProfile, dispatch),
    getProfileStats: bindActionCreators(getProfileStats, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BodyStats);
