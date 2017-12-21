import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth.js'
import entries, * as fromEntries from './entries.js'
import calendar, * as fromCalendar from './calendar.js'
import bodyStats, * as fromBodyStats from './bodyStats.js'

export default combineReducers({
  auth: auth,
  entries: entries,
  calendar: calendar,
  bodyStats: bodyStats,
  router: routerReducer
})


export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const userId = state => fromAuth.userId(state.auth)

//TODO: change serverMessageEntries to something better
export const serverMessageEntries = state => fromEntries.serverMessageEntries(state.entries)
// export const calendarState = state => fromCalendar.calendarState(state.calendar)

export const targetDailyCalorieChange = state => fromBodyStats.targetDailyCalorieChange(state)
export const currentWeight = state => fromBodyStats.currentWeight(state)
export const weightChange = state => fromBodyStats.weightChange(state)
export const currentTDEE = state => fromBodyStats.currentTDEE(state)
export const goalWeightDate = state => fromBodyStats.goalWeightDate(state)
export const timeUntilGoal = state => fromBodyStats.timeUntilGoal(state)
export const caloricNeed = state => fromBodyStats.caloricNeed(state)

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}

// export const getEntryByDate = state => getEntry(state, date)
