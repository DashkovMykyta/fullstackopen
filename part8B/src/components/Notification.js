import React, { useEffect } from "react";

export default function Notification({ message, setMessage }) {
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message, setMessage]);

  return message && <div>{message}</div>;
}
