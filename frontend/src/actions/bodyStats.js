import { RSAA } from 'redux-api-middleware'
import { withAuth, userId } from '../reducers'

export const UPDATE_STARTING_WEIGHT = 'UPDATE_STARTING_WEIGHT'
export const UPDATE_GOAL_WEIGHT = 'UPDATE_GOAL_WEIGHT'
export const UPDATE_GOAL_WEIGHT_CHANGE_PER_WEEK = 'UPDATE_GOAL_WEIGHT_CHANGE_PER_WEEK'

export const UPDATE_PROFILE_REQUEST = '@@bodystats/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = '@@bodystats/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = '@@bodystats/UPDATE_PROFILE_FAILURE';

export function updateInput(event) {
  if(event.target.name === "startingWeight"){
    return {
      type: UPDATE_STARTING_WEIGHT,
      startingWeight: event.target.value
    }
  } else if (event.target.name === "goalWeight") {
    return {
      type: UPDATE_GOAL_WEIGHT,
      goalWeight: event.target.value
    }
  } else if (event.target.name === "goalWeightChangePerWeek") {
    return {
      type: UPDATE_GOAL_WEIGHT_CHANGE_PER_WEEK,
      goalWeightChangePerWeek: event.target.value
    }
  }
}

export const updateProfile = (id, event) => ({
  [RSAA]: {
    endpoint: '/profile/'+id+'/',
    method: 'PATCH',
    body: JSON.stringify({
      [event.target.name]: event.target.value
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE
    ]
  }
})
