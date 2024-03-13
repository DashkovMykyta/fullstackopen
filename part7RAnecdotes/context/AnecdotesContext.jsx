import React, { createContext, useContext, useState } from "react";

export const AnecdotesContext = createContext();

export const createAnecdote = (anecdote) => {
  const { setAnecdotes, anecdotes } = useContext(AnecdotesContext);
  setAnecdotes(anecdotes.concat(anecdote));
};

export const updateAnecdote = (id, anecdote) => {
  const { setAnecdotes, anecdotes } = useContext(AnecdotesContext);
  setAnecdotes(anecdotes.map((a) => (a.id === id ? anecdote : a)));
};

export const getAnecdoteById = (id) => {
  const { anecdotes } = useContext(AnecdotesContext);
  return anecdotes.find((a) => a.id === id);
};

const AbecdotesContextProvider = ({ children }) => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  return (
    <AnecdotesContext.Provider value={{ anecdotes, setAnecdotes }}>
      {children}
    </AnecdotesContext.Provider>
  );
};

export default AbecdotesContextProvider;
