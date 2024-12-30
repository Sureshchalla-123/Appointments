// src/components/Appointments/index.js

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isStarredFilterActive: false,
  }

  onAddAppointment = () => {
    const {titleInput, dateInput, appointmentsList} = this.state

    if (true) {
      // Parse dateInput to a valid format
      const formattedDate = new Date(dateInput).toISOString()

      const newAppointment = {
        id: uuidv4(),
        title: titleInput,
        date: formattedDate, // Store date in a format that can be parsed
        isStarred: false,
      }

      this.setState({
        appointmentsList: [...appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
      })
    }
  }

  onChangeInput = event => {
    const {id, value} = event.target
    this.setState({[`${id}Input`]: value})
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment =>
        appointment.id === id
          ? {...appointment, isStarred: !appointment.isStarred}
          : appointment,
      ),
    }))
  }

  render() {
    const {
      appointmentsList,
      titleInput,
      dateInput,
      isStarredFilterActive,
    } = this.state

    const filteredAppointments = isStarredFilterActive
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList

    return (
      <div className="bg-container">
        <div className="appointments-container">
          <div className="header-container">
            <div className="add-appointment-container">
              <h1 className="heading">Add Appointment</h1>
              <div className="input-container">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  className="input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="input-container">
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  value={dateInput}
                  onChange={this.onChangeInput}
                />
              </div>
              <button
                type="button"
                className="add-button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </div>
            <div className="banner-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="banner-image"
                alt="appointments"
              />
            </div>
          </div>
          <div className="appointments-list-container">
            <div className="starred-filter-container">
              <h1 className="starred-filter-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-filter-button ${
                  isStarredFilterActive ? 'active' : ''
                }`}
                onClick={this.toggleStarredFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointments.map(appointment => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  onToggleStar={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
