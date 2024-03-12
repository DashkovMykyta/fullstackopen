import React, { createContext, useContext, useReducer, useState } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        message: action.message,
        show: true,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const useNotification = () => {
  const { notificationDispatch } = useContext(NotificationContext);
  return (message, time) => {
    notificationDispatch({
      type: "SHOW_NOTIFICATION",
      message,
    });
    setTimeout(() => {
      notificationDispatch({ type: "HIDE_NOTIFICATION" });
    }, time * 1000);
  };
};

export const useNotificationState = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
