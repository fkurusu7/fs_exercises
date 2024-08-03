function Notification({ message, cssClass }) {
  return <div className={`${cssClass}`}>{message}</div>;
}

export default Notification;
