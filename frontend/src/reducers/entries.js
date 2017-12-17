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
      return action.payload
      break;
    case entries.ENTRY_POST_SUCCESS:
      return [...state, action.payload ]
      break;
    case entries.ENTRY_UPDATE_SUCCESS:
        return [...state, action.payload ]
        break;
    default:
      return state
  }

}

export const serverMessageEntries = (state) => state.entries

// const byDate = (state = {}, action) => {
//   switch (action.type) {
//     case 'RECEIVE_ENTRY':
//       return {
//         ...state,
//         ...action.entries.reduce((obj, entry) => {
//           obj[entry.date] = entry
//           return obj
//         }, {})
//       }
//     default:
//       const { entryDate } = action
//       if(entryDate){
//         return {
//           ...state,
//           [entryDate]: entry
//         }
//       }
//   }
// }
//
// export const getEntry = (state, date) =>
//   state.byDate(date)
