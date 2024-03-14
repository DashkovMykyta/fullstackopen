import { useContext, useState } from "react";
import {
  AnecdotesContext,
  createAnecdote,
} from "../../context/AnecdotesContext";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const CreateNew = (props) => {
  const content = useField("text");
  const info = useField("text");
  const author = useField("text");

  const { showNotification } = useNotification();
  const { setAnecdotes, anecdotes } = useContext(AnecdotesContext);
  const navigate = useNavigate();

  const getId = () => (100000 * Math.random()).toFixed(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnecdotes(
      anecdotes.concat({ content, author, info, votes: 0, id: getId() })
    );
    // createAnecdote({
    //   content,
    //   author,
    //   info,
    //   votes: 0,
    //   id: getId(),
    // });
    showNotification(`a new anecdote ${content} created!`);
    content.reset();
    author.reset();
    info.reset();
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            value={content.value}
            onChange={content.onChange}
            type={content.type}
          />
        </div>
        <div>
          author
          <input
            value={author.value}
            onChange={author.onChange}
            type={author.type}
          />
        </div>
        <div>
          url for more info
          <input value={info.value} onChange={info.onChange} type={info.type} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
