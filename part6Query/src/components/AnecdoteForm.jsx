import requests from "../services/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdote = useMutation({
    mutationFn: requests.create,
    onSuccess: (created) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(created));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) return;
    newAnecdote.mutate({ content, votes: 0 });
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
