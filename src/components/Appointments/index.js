// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], inputTitle: '', inputDate: ''}

  filteredStarred = () => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.filter(
        each => each.isStarClicked === true,
      ),
    }))
  }

  toggleIsFavourite = id => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.map(eachListItem => {
        if (eachListItem.id === id) {
          return {...eachListItem, isStarClicked: !eachListItem.isStarClicked}
        }
        return eachListItem
      }),
    }))
  }

  onChangeInputTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeInputDate = event => {
    const finaldate = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({inputDate: finaldate})
  }

  renderAppointmentLists = () => {
    const {appointmentsList} = this.state

    return appointmentsList.map(eachItem => (
      <AppointmentItem
        key={eachItem.id}
        appointmentDetails={eachItem}
        toggleIsFavourite={this.toggleIsFavourite}
      />
    ))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const newAppointment = {
      id: v4(),
      inputTitle: inputTitle,
      inputDate: inputDate,
      isStarClicked: false,
    }
    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  render() {
    const {inputDate, inputTitle} = this.state

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="card-hori">
            <div className="only-appointment-and-img">
              <div className="upper-card-div">
                <h1 className="head">Add Appointment</h1>
                <form className="form-el" onSubmit={this.onAddAppointment}>
                  <label for="title" className="label-title">
                    TITLE
                  </label>
                  <input
                    className="input-title"
                    type="text"
                    id="title"
                    placeholder="Title"
                    onChange={this.onChangeInputTitle}
                    value={inputTitle}
                  />
                  <label for="datee" className="label-date">
                    DATE
                  </label>
                  <input
                    className="input-date"
                    type="date"
                    id="datee"
                    
                    onChange={this.onChangeInputDate}
                    value={inputDate}
                  />
                  <button className="button" type="submit">
                    Add
                  </button>
                </form>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image"
                alt="appointments"
              />
            </div>
            <hr className="hori" />
            <div className="appointsments-starred">
              <h1 className="appointment-head">Appointments</h1>
              <button
                className="starred-button"
                type="button"
                onClick={this.filteredStarred}
              >
                Starred
              </button>
            </div>
            <ul className="listItems">{this.renderAppointmentLists()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
