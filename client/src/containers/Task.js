import React, { Component } from 'react'
import { countdown } from '../actions/actions'

export default class Task extends Component {

    state = {
        countdown: ""
    }

    passedDeadline = new Date(this.props.task.deadline) <= new Date() ? true : false

    deadline = new Date(this.props.task.deadline).toLocaleString()

    componentDidMount() {
        this.interval = setInterval(this.countdownTimer, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    countdownTimer = () => {
        this.setState({
            countdown: countdown(this.props.task.deadline)
        })
    }


  render() {

    function renderCompletionStatus() {
        if (this.passedDeadline && this.props.task.completed) {
            return (
                <React.Fragment>
                    <h1 className="completed">Completed</h1>
                    <h3>{this.deadline}</h3>        
                    <p>{this.props.task.description}</p>
                </React.Fragment>
            )
        } else if (this.passedDeadline && this.props.task.completed === false) {
            return (
                <React.Fragment>
                    <h1 className="incompleted">Incomplete!</h1>
                    <h3>Late by {this.state.countdown}</h3>
                    <p>{this.props.task.description}</p>
                    <button>Check</button>
                    <button>Delete</button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <h1>{this.state.countdown}</h1>
                    <h3>{this.deadline}</h3>        
                    <p>{this.props.task.description}</p>
                    <button>Check</button>
                    <button>Delete</button>
                </React.Fragment>
            )        
        }
    }
    
    return (
        <div className="container">
            {renderCompletionStatus.call(this)}
        </div>
    )
  }
}