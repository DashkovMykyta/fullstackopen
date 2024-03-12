import { useNotification } from "../../context/NotificationContext";
import requests from "../services/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();
  const newAnecdote = useMutation({
    mutationFn: requests.create,
    onError: (error, data) => {
      data.content.length < 5
        ? notification("Anecdote must be at least 5 characters long", 5)
        : notification(`Failed to create anecdote: ${error.message}`, 5);
    },
    onSuccess: (created) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(created));
      notification(`New anecdote created: ${created.content}`, 5);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
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
