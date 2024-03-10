import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./components/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <h1>Hello, Its me, Mario!</h1>
    <App />
  </Provider>
);
