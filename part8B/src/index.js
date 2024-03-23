import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const aclient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={aclient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </QueryClientProvider>
);
