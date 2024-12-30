import './index.css'

const AppointmentItem = props => {
  const {appointment, onToggleStar} = props
  const {id, title, date, isStarred} = appointment

  // Format the date into a human-readable format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starAltText = isStarred ? 'filled star' : 'star'

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">Date: {formattedDate}</p>
      </div>
      <button
        type="button"
        className="star-button"
        data-testid="star"
        onClick={() => onToggleStar(id)}
      >
        <img src={starImgUrl} alt={starAltText} className="star-img" />
      </button>
    </li>
  )
}

export default AppointmentItem
