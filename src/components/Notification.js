import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null || type === null) {
    return null
  }
  if(type === 'success') {
    return(<div className="success notification_box">
      {message}
    </div>)
  }
  if(type === 'error') {
    return (
      <div className="error notification_box">
        {message}
      </div>
    )
  }
  return (
    <div>
      {message}
    </div>
  )
}

export default Notification