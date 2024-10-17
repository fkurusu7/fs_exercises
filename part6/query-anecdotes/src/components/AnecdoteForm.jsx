import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, dispatch] = useContext(NotificationContext);

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "NEW_NOTE", payload: `Created ${newAnecdote.content}` });
      setTimeout(() => {
        dispatch({
          type: "NEW_NOTE",
          payload: "",
        });
      }, 5000);
    },
    onError: (error) => {
      dispatch({ type: "NEW_NOTE", payload: `Error: ${error.message}` });
      setTimeout(() => {
        dispatch({ type: "NEW_NOTE", payload: "" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    event.target.anecdote.value = "";
    if (content.length < 5) {
      console.log("Anecdote less 5");
      dispatch({
        type: "NEW_NOTE",
        payload: "Anecdote length is less than 5 chars, change it",
      });
      setTimeout(() => {
        dispatch({ type: "NEW_NOTE", payload: "" });
      }, 5000);
    } else {
      newNoteMutation.mutate({
        content: content,
        votes: 0,
      });
    }
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
