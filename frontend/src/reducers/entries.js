import * as entries from '../actions/entries'

const initialState = {
    id: null,
    date: null,
    weight: null,
    calories: null,
    owner: null
}

export default (state=initialState, action) => {
  switch (action.type) {
    case entries.ENTRIES_SUCCESS:
      console.log("API success", action)
      return {
        entries: action.payload
      }
      break;
    case entries.ENTRY_POST_SUCCESS:
      return {
        entries: action.payload
      }
      break;
    default:
      return state
  }

}

export const serverMessageEntries = (state) => state.entries