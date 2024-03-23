// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavourite} = props
  const {id, inputTitle, inputDate, isStarClicked} = appointmentDetails

  const starImgUrl = isStarClicked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClicking = () => {
    toggleIsFavourite(id)
  }

  return (
    <li className="list-item">
      <div className="title-star-div">
        <p className="title">{inputTitle}</p>
        <button className="button1" data-testid="star" onClick={onClicking}>
          <img src={starImgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">{inputDate}</p>
    </li>
  )
}
export default AppointmentItem
