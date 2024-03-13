import React from "react";
import { useNotification } from "../../context/NotificationContext";

function Notification() {
  const { notification } = useNotification();
  return (
    notification && (
      <div style={{ padding: 10, border: 1, borderColor: "black" }}>
        {notification}
      </div>
    )
  );
}

export default Notification;
