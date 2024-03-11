import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createNotification,
  initializeAnecdotes,
  voteForAnecdote,
} from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

function Anecdotes() {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  );

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </>
  );
}

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteForAnecdote(id));
    dispatch(createNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdotes;
