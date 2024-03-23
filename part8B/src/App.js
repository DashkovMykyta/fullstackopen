import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useState } from "react";
import Notification from "./components/Notification";

const App = () => {
  const [message, setMessage] = useState(null);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <Link to={"/"}>authors</Link>
        <Link to={"/books"}>books</Link>
        <Link to={"/add"}>add book</Link>
      </div>

      <Notification message={message} setMessage={setMessage} />

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setMessage={setMessage} />} />
      </Routes>

      {/* <Authors />

      <Books />

      <NewBook  /> */}
    </div>
  );
};

export default App;
