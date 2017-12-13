import * as entries from '../actions/entries'

const initialState = {
  message: ""
}

export default (state=initialState, action) => {
  switch (action.type) {
    case entries.ENTRIES_SUCCESS:
      return {
        message: action.payload.message
      }
      break;
    default:
      return state
  }
}

export const serverMessageEntries = (state) => state.message
