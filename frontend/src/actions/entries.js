import { RSAA } from 'redux-api-middleware'
import { withAuth } from '../reducers'

export const ENTRIES_REQUEST = '@@entries/ENTRIES_REQUEST';
export const ENTRIES_SUCCESS = '@@entries/ENTRIES_SUCCESS';
export const ENTRIES_FAILURE = '@@entries/ENTRIES_FAILURE';

export const ENTRY_POST_REQUEST = '@@entries_post/ENTRY_POST_REQUEST';
export const ENTRY_POST_SUCCESS = '@@entries_post/ENTRY_POST_SUCCESS';
export const ENTRY_POST_FAILURE = '@@entries_post/ENTRY_POST_FAILURE';

export const ENTRY_UPDATE_REQUEST = '@@entry_update_request/ENTRY_UPDATE_REQUEST'
export const ENTRY_UPDATE_SUCCESS = '@@entry_update_success/ENTRY_UPDATE_SUCCESS'
export const ENTRY_UPDATE_FAILURE = '@@entry_update_failure/ENTRY_UPDATE_FAILURE'

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

export const updateEntryAction = (id, date, weight, calories) => ({
  [RSAA]: {
    endpoint: '/entries/'+id+'/',
    method: 'PUT',
    body: JSON.stringify({
      date: date,
      weight: weight,
      calories: calories
    }),
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      ENTRY_UPDATE_REQUEST, ENTRY_UPDATE_SUCCESS, ENTRY_UPDATE_FAILURE
    ]
  }
})
