import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnecdotesContext } from "../../context/AnecdotesContext";

const AnecdoteList = () => {
  const { anecdotes } = useContext(AnecdotesContext);

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
