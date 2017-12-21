import * as auth from '../actions/register'

const initialState = {
    isRegistered: false,
    errors: {}
}

export default (state=initialState, action) => {
  switch (action.type) {
    case auth.REGISTER_SUCCESS:
      return {isRegistered: true}
    case auth.REGISTER_FAILURE:
      return {
        isRegistered: false,
        errors:
            action.payload.response ||
              {'non_field_errors': action.payload.statusText},
      }
    default:
      return state
  }
}
