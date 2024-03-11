import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { removeNotification, setNotification } from "./notificationReducer";
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const anecdotes = JSON.parse(JSON.stringify(state));
      const id = action.payload;

      const anecdoteToChange = anecdotes.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return anecdotes.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    createAnecdote: (state, action) => {
      return state.concat(asObject(action.payload));
    },
    appendAnecdote: (state, action) => {
      return state.concat(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { vote, createAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteReducer.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.updateVotes(id);
    dispatch(vote(id));
  };
};

export const createNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default anecdoteReducer.reducer;
