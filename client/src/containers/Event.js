import React, { Component } from 'react'
import EventCard from '../components/EventCard'
import EventShow from '../components/EventShow'

import { connect } from 'react-redux'
import { countdown } from '../actions/actions'
import { deleteEvent } from '../actions/actions'

class Event extends Component {

    state = {
        countdown: ""
    }

    deadline = new Date(this.props.event.deadline).toLocaleString()

    prepared = null

    componentDidMount() {
        this.checkPreparedness()
        this.interval = setInterval(this.countdownTimer, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    countdownTimer = () => {
        this.setState({
            countdown: countdown(this.props.event.deadline)
        })
    }

    checkPreparedness = () => {
        let passedDeadline = new Date(this.props.event.deadline) <= new Date() ? true : false
        let completedTasks = false
        if (this.props.event.tasks.length !== 0) {
            completedTasks = this.props.event.tasks.every(task => task.completed === true)
        }
        if (passedDeadline && completedTasks) {
            this.prepared = "Fully Prepared!"
        } else if (passedDeadline && completedTasks === false) {
            this.prepared = "Not Prepared"
        }
    }

    handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event? All tasks will be deleted as well.')) {
            this.props.deleteEvent(this.props.event.id)
        }
    }


    render() {
        function renderEvent() {
            if (this.props.show) {
                return <EventShow event={this.props.event} deadline={this.deadline} 
                countdown={this.state.countdown} prepared={this.prepared}
                handleDelete={this.handleDelete} />
            } else {
                return <EventCard event={this.props.event} deadline={this.deadline} 
                countdown={this.state.countdown} prepared={this.prepared}
                handleDelete={this.handleDelete} />
            }
        }

        return (
            <React.Fragment>
                {renderEvent.call(this)}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
      events: state.eventsState.events,
      loading: state.eventsState.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEvent: id => dispatch(deleteEvent(id))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Event)