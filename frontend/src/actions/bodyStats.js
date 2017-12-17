export const UPDATE_STARTING_WEIGHT = 'UPDATE_STARTING_WEIGHT'
export const UPDATE_GOAL_WEIGHT = 'UPDATE_GOAL_WEIGHT'
export const UPDATE_GOAL_WEIGHT_CHANGE_PER_WEEK = 'UPDATE_GOAL_WEIGHT_CHANGE_PER_WEEK'

export function updateInput(event) {
  // console.log("event value", event.target.value)
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
