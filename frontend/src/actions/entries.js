import { RSAA } from 'redux-api-middleware'
import { withAuth } from '../reducers'

export const ENTRIES_REQUEST = '@@entries/ENTRIES_REQUEST';
export const ENTRIES_SUCCESS = '@@entries/ENTRIES_SUCCESS';
export const ENTRIES_FAILURE = '@@entries/ENTRIES_FAILURE';

export const ENTRY_POST_REQUEST = '@@entries_post/ENTRY_POST_REQUEST';
export const ENTRY_POST_SUCCESS = '@@entries_post/ENTRY_POST_SUCCESS';
export const ENTRY_POST_FAILURE = '@@entries_post/ENTRY_POST_FAILURE';

export const ENTRY_UPDATE_WEIGHT = '@@entries/ENTRY_UPDATE_WEIGHT';
export const ENTRY_UPDATE_CALORIES = '@@entries/ENTRY_UPDATE_CALORIES';

export const entryAction = (entries) => ({
  [RSAA]: {
    endpoint: '/entries/',
    method: 'GET',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      ENTRIES_REQUEST, ENTRIES_SUCCESS, ENTRIES_FAILURE
    ]
  }
})

export const postEntryAction = (date, weight, calories) => ({
  [RSAA]: {
    endpoint: '/entries/',
    method: 'POST',
    body: JSON.stringify({
      date: date,
      weight: weight,
      calories: calories
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      ENTRY_POST_REQUEST, ENTRY_POST_SUCCESS, ENTRY_POST_FAILURE
    ]
  }
})

export function updateWeight(event) {
  return {type: ENTRY_UPDATE_WEIGHT,
  weight: event.target.value}
}
