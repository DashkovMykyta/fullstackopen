import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NotificationContextProvider from "../context/NotificationContext";
import AnecdotesContextProvider from "../context/AnecdotesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationContextProvider>
      <AnecdotesContextProvider>
        <App />
      </AnecdotesContextProvider>
    </NotificationContextProvider>
  </BrowserRouter>
);
