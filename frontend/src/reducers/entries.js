import * as entries from '../actions/entries'

const initialState = {
    id: null,
    date: null,
    weight: null,
    calories: null,
    owner: null
}

export default (state=initialState, action) => {
  console.log("log action===", action)
  console.log("state----", state)
  switch (action.type) {

    case entries.ENTRIES_SUCCESS:
      console.log("API success", action)
      return action.payload
      break;
    case entries.ENTRY_POST_SUCCESS:
      return [...state, action.payload ]
      break;
    case entries.ENTRY_UPDATE_WEIGHT:
      console.log("update weight: ", action)
      return {
        ...state, weight: action['weight']
      }
      break;
    case entries.ENTRY_UPDATE_CALORIES:
      return {
        calories: action['calories']
      }
      break;
    default:
      return state
  }

}

export const serverMessageEntries = (state) => state.entries
