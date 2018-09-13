import { combineReducers } from "redux"
import cuid from 'cuid'
export const cuidFn = cuid
 
const rootReducer = combineReducers({
  eventsState: eventsReducer,
  tasksState: tasksReducer,
})
 
export default rootReducer
 
function tasksReducer(state = {
  tasks: [],
  loading: false
  }, action) {
  switch (action.type) {

    case "LOAD_TASK_REQUEST":
      return {...state, loading: true} 
    case "ADD_TASK":
      state.tasks.push(action.task)
      return state
    case "ADD_TASKS":
      //action.payload.map(task => task['id'] = cuidFn())
      return {tasks: action.payload, loading: false}    
    case "DELETE_TASK":
        state.filter(task => task.id !== action.id)
        return state



    default:
      return state
  }
}
 
function eventsReducer(state = {
  events: [
    {id: 1, deadline: "2018-09-14T12:59", title: "Surprise Party", description: "Ut enim ad minim veniam, quis nostrud exercitation… laboris nisi ut aliquip ex ea commodo consequat.", tasks: []},
    {id: 2, deadline: "2018-09-25T18:59", title: "Graduation", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    tasks: [
      {id: 1, completed: true, deadline: "2018-09-11T12:59", description: "Ut enim ad minim veniam, quis nostrud exercitation."},
      {id: 2, completed: false, deadline: "2018-09-10T12:59", description: "Ut enim ad minim veniam, quis nostrud exercitation."},
      {id: 3, completed: false, deadline: "2018-09-19T12:30", description: "Ut enim ad minim veniam, quis nostrud exercitation."}
    ]},
    {id: 3, deadline: "2018-09-11T15:00", title: "CockTail Party", description: "Duis aute irure dolor in reprehenderit in voluptat…elit esse cillum dolore eu fugiat nulla pariatur.", tasks: []}
  ],
  loading: false
}, action) {
  switch (action.type) {
    case "LOAD_EVENT_REQUEST":
      return {...state, loading: true} 
    case "ADD_EVENTS":
      //action.payload.map(event => event['id'] = cuidFn())
      return {events: action.payload, loading: false}    
    case "DELETE_EVENT":
        state.filter(event => event.id !== action.id)
        return state
 
    default:
      return state
  }
}

