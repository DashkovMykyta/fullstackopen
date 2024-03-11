import React from "react";
import { useDispatch } from "react-redux";
import {
  createAnecdote,
  createNewAnecdote,
  createNotification,
} from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;

    dispatch(createNewAnecdote({ content, votes: 0 }));
    dispatch(createNotification(`you created '${content}'`, 5));
    event.target.content.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input name="content" />
        <button>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
