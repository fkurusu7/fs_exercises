import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./services/anecdotes";
import { useContext } from "react";
import NotificationContext from "./contexts/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const [, dispatch] = useContext(NotificationContext);

  // GET ANECDOTES
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  // Update an Anecdote
  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({
        type: "ADD_VOTE",
        payload: `Voted for "${updatedAnecdote.content}"`,
      });
      setTimeout(() => {
        dispatch({
          type: "ADD_VOTE",
          payload: "",
        });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote", anecdote.id);
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
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
