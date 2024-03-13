import React from "react";
import {
  getAnecdoteById,
  updateAnecdote,
} from "../../context/AnecdotesContext";

function SingleAnecdote({ anecdote }) {
  const vote = (id) => {
    const anecdote = getAnecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    updateAnecdote(id, voted);
  };
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
}

export default SingleAnecdote;
