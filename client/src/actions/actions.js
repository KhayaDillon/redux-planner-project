import fetch from 'isomorphic-fetch'


export function createEvent(data) {
    debugger
    return fetch('http://localhost:3001/events', {
        method: 'POST',
        credentials: "same-origin",
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(resp => {
        debugger
        resp.json()})
    .then(event => console.log(event))

}

export function fetchEvents() {
    // debugger
    return (dispatch) => {
        dispatch({ type: 'LOAD_EVENTS_REQUEST' })
        return fetch('http://localhost:3001/events')
        .then(resp => {
            console.log(resp.status)
            console.log(resp.statusText)
            // debugger
            resp.json()})
        .then(events => dispatch({type: "ADD_EVENTS", payload: events}))
        .catch(error => {
            // debugger
            console.log(error)})
    }
}

export function countdown(event_deadline) {
    let now = new Date().getTime()
    let deadline = new Date(event_deadline).getTime()
    let distance = deadline - now
    
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
    let countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s "
    return countdown
}

export function fetchEventShow(id) {
    return (dispatch) => {
      dispatch({ type: 'LOAD_EVENT_SHOW_REQUEST' })
      return fetch(`http://localhost:3001/events/${id}`)
        .then(response => response.json())
        .then(events => dispatch({ type: 'SHOW_EVENT', events}))
    }
}

export const createTask = task => {
    return {
        type: 'CREATE_TASK',
        task
    }
}

export const deleteEvent = event => {
    return {
        type: 'DELETE_EVENT',
        event
    }
}

export const deleteTask = task => {
    return {
        type: 'DELETE_TASK',
        task
    }
}
