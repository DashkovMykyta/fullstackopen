import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./context/NotificationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionProvider from "./context/SessionProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </SessionProvider>
  </QueryClientProvider>
);
