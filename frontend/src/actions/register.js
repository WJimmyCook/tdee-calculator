import { RSAA } from 'redux-api-middleware';

export const REGISTER_REQUEST = '@@register/REGISTER_REQUEST';
export const REGISTER_SUCCESS = '@@register/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@@register/REGISTER_FAILURE';

export const register = (email, username, password) => ({
  [RSAA]: {
    endpoint: '/users/',
    method: 'POST',
    body: JSON.stringify({email, username, password}),
    headers: { 'Content-Type': 'application/json' },
    types: [
      REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
    ]
  }
})
