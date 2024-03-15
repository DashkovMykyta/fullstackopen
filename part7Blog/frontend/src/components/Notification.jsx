import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider";

export default function Notification() {
  const { notification } = useContext(NotificationContext);
  return notification && <div className="error">{notification}</div>;
}
