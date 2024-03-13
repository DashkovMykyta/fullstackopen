import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

export const useNotification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  return { notification, showNotification };
};

const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
