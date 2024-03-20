import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./context/NotificationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import SessionProvider from "./context/SessionProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BrowserRouter>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
