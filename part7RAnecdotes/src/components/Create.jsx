import { useContext, useState } from "react";
import {
  AnecdotesContext,
  createAnecdote,
} from "../../context/AnecdotesContext";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";

const CreateNew = (props) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

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
    setAuthor("");
    setContent("");
    setInfo("");
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
