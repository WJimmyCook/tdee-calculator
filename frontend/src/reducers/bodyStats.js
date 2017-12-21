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
    case bodyStats.UPDATE_PROFILE_SUCCESS:
      return [...state, action.payload]
      break;
    default:
    return state
  }
}

export function targetDailyCalorieChange(state){
  if(state.bodyStats.goalWeightChangePerWeek){
    return parseFloat((state.bodyStats.goalWeightChangePerWeek * 3500 / 7).toFixed(2))
  }
}

export function currentWeight(state){
  if(state.entries.length > 1){
    const entryDates = state.entries.map((entry, index) => {
      return moment(entry.date)
    })
    return parseFloat(state.entries.filter((entry) => {
      return entry.date == moment.max(entryDates).format("YYYY-MM-DD")
    })[0].weight.toFixed(2))
  }
}

export function weightChange(state){
  if(state.bodyStats.startingWeight && currentWeight(state)){
    return parseFloat(Math.abs(state.bodyStats.startingWeight - currentWeight(state)).toFixed(2))
  }
}

export function currentTDEE(state){
  if(state.entries.length > 0){
    const avgCalories = state.entries.reduce((sum, entry) => {
      return sum + entry.weight
    }, 0) / state.entries.length

    const delta = currentWeight(state) - state.bodyStats.startingWeight

    const entryCount = state.entries.length

    const currentTDEEValue = avgCalories + (-delta * 3500)/entryCount

    return parseFloat(currentTDEEValue.toFixed(2))
  }
}

export function timeUntilGoal(state){
  return parseFloat((Math.abs(state.bodyStats.goalWeight -
    currentWeight(state)) / state.bodyStats.goalWeightChangePerWeek).toFixed(2))
}

export function goalWeightDate(state){
  return Moment().add(timeUntilGoal(state), 'w').format("MMMM DD YYYY")
}

export function caloricNeed(state){
  if(state.bodyStats.goalWeight > currentWeight(state)){
    return parseFloat((currentTDEE(state) + targetDailyCalorieChange(state)).toFixed(2))
  } else {
    return parseFloat((currentTDEE(state) - targetDailyCalorieChange(state)).toFixed(2))
  }
}
