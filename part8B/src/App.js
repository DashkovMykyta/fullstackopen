import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useState } from "react";
import Notification from "./components/Notification";
import { useApolloClient, useSubscription } from "@apollo/client";
import Login from "./components/Login";
import Recomended from "./components/Recomended";
import { BOOK_ADDED, GET_ALL_BOOKS } from "./queries";

const App = () => {
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      setMessage(`New book added: ${data.data.bookAdded.title}`);

      client.cache.updateQuery({ query: GET_ALL_BOOKS }, (data) => {
        console.log(data);
        return {
          allBooks: data.allBooks.concat(data.bookAdded),
        };
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <Link to={"/"}>authors</Link>
        <Link to={"/books"}>books</Link>
        {token ? (
          <>
            <Link to={"/add"}>add book</Link>
            <Link to={"/recomended"}>recomended</Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      </div>

      <Notification message={message} setMessage={setMessage} />

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setMessage={setMessage} />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setError={setMessage} />}
        />
        <Route path="/recomended" element={<Recomended />} />
      </Routes>

      {/* <Authors />

      <Books />

      <NewBook  /> */}
    </div>
  );
};

export default App;
