import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you created '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
