import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import requests from "./services/requests";
import { useNotification } from "../context/NotificationContext";
const App = () => {
  const queryClient = useQueryClient();
  const notification = useNotification();
  const { data, isError, isLoading } = useQuery({
    queryFn: () => requests.retrieveAll(),
    queryKey: ["anecdotes"],
  });
  const updateAnecdote = useMutation({
    mutationFn: requests.updateVotes,
    onSuccess: (updated) => {
      queryClient.setQueryData(["anecdotes"], (old) =>
        old.map((a) => (a.id === updated.id ? updated : a))
      );
      notification(`You voted for: ${updated.content}`, 5);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdote.mutate(anecdote.id);
  };

  if (isLoading) return "Loading...";
  if (isError) return "Error";
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
