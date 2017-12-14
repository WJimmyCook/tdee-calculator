export function startDateChange(event) {
  return {type: 'CHANGE_START_DATE',
  startDate: event.target.value}
}
export function incrementMonth() {
  return {type: 'INCREMENT_MONTH'}
}
export function decrementMonth() {
  return {type: 'DECREMENT_MONTH'}
}
