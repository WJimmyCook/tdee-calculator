import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth.js'
import entries, * as fromEntries from './entries.js'
import calendar, * as fromCalendar from './calendar.js'

export default combineReducers({
  auth: auth,
  entries: entries,
  calendar: calendar,
  router: routerReducer
})


export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const serverMessageEntries = state => fromEntries.serverMessageEntries(state.entries)
export const calendarState = state => fromCalendar.calendarState(state.calendar)

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
