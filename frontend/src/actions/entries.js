import { RSAA } from 'redux-api-middleware'
import { withAuth } from '../reducers'

export const ENTRIES_REQUEST = '@@entries/ENTRIES_REQUEST';
export const ENTRIES_SUCCESS = '@@entries/ENTRIES_SUCCESS';
export const ENTRIES_FAILURE = '@@entries/ENTRIES_FAILURE';

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
