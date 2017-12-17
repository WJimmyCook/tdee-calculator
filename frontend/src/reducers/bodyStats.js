import * as bodyStats from '../actions/bodyStats'
import Moment from 'moment'

const moment = Moment;

const initialState = {
  weightUnit: undefined,
  energyUnit: undefined,
  startingWeight: undefined,
  goalWeight: undefined,
  goalWeightChangePerWeek: undefined,
  targetDailyCalorieChange: undefined,
  currentWeight: undefined,
  weightChange: undefined,
  currentTDEE: undefined,
  goalWeightAchievementDate: undefined,
  dailyCaloriesForGoal: undefined,
  weeksUntilGoalAchieved: undefined,
}

export default (state=initialState, action) => {
  console.log("action", action)
  switch (action.type) {
    case bodyStats.UPDATE_STARTING_WEIGHT:
      return {...state, startingWeight: action.startingWeight}
      break;
    case bodyStats.UPDATE_GOAL_WEIGHT:
      return {...state, goalWeight: action.goalWeight}
      break;
    case bodyStats.UPDATE_GOAL_WEIGHT_CHANGE_PER_WEEK:
      return {...state, goalWeightChangePerWeek: action.goalWeightChangePerWeek}
      break;
    default:
    return state
  }
}

export function targetDailyCalorieChange(state){
  console.log("state body", state)
  if(state.bodyStats.goalWeightChangePerWeek){
    return state.bodyStats.goalWeightChangePerWeek * 3500 / 7
  }
}

export function currentWeight(state){
  if(state.entries.length > 1){
    const entryDates = state.entries.map((entry, index) => {
      return moment(entry.date)
    })
    return state.entries.filter((entry) => {
      return entry.date == moment.max(entryDates).format("YYYY-MM-DD")
    })[0].weight
  }
}

export function weightChange(state){
  console.log("weight chagne", state)
  if(state.bodyStats.startingWeight && currentWeight(state)){
    return Math.abs(state.bodyStats.startingWeight - currentWeight(state))
  }
}

export function currentTDEE(state){
  if(state.entries.length > 0){
    const avgCalories = state.entries.reduce((sum, entry) => {
      return sum + entry.weight
    }, 0) / state.entries.length
    console.log("avgCaloreies", avgCalories)

    const delta = currentWeight(state) - state.bodyStats.startingWeight
    console.log("delta", delta)

    const entryCount = state.entries.length
    console.log("entryCount", entryCount)

    const currentTDEEValue = avgCalories + (-delta * 3500)/entryCount
    console.log("currentTDEE", currentTDEEValue)

    return currentTDEEValue
  }
}

export function timeUntilGoal(state){
  return Math.abs(state.bodyStats.goalWeight - currentWeight(state)) / state.bodyStats.goalWeightChangePerWeek
}

export function goalWeightDate(state){
  return Moment().add(timeUntilGoal(state), 'w').format("MMMM DD YYYY")
}

export function caloricNeed(state){
  console.log("current tdeee", currentTDEE(state))
  console.log("daily change", targetDailyCalorieChange(state))
  if(state.bodyStats.goalWeight > currentWeight(state)){
    return currentTDEE(state) + targetDailyCalorieChange(state)
  } else {
    return currentTDEE(state) - targetDailyCalorieChange(state)
  }
}
