import { useContext, useState } from "react";
import AnecdoteList from "./components/Anecdotes";
import About from "./components/About";
import CreateNew from "./components/Create";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { Routes, Route, useMatch } from "react-router-dom";
import SingleAnecdote from "./components/SingleAnecdote";
import { AnecdotesContext } from "../context/AnecdotesContext";
import Notification from "./components/Notification";

const App = () => {
  const { anecdotes } = useContext(AnecdotesContext);
  const match = useMatch("/anecdotes/:id");
  const anecdoteById = (id) => anecdotes.find((a) => a.id == id);

  const anecdote = match ? anecdoteById(match.params.id) : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route
          path="/anecdotes/:id"
          element={<SingleAnecdote anecdote={anecdote} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
