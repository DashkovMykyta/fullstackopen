import React from "react";
import { useNotificationState } from "../../context/NotificationContext";
const Notification = () => {
  const notification = useNotificationState();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return notification && <div style={style}>{notification.message}</div>;
};

export default Notification;
