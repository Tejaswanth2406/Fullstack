const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{
      color: 'green',
      background: 'lightgrey',
      padding: '10px',
      marginBottom: '10px',
      border: '2px solid green'
    }}>
      {message}
    </div>
  )
}

export default Notification
