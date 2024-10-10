import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addAnecdote, createAnecdote } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotes";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value.trim();
    if (content) {
      const newAnecdote = await anecdotesService.createAnecdote(content);
      dispatch(createAnecdote(newAnecdote));
      ev.target.anecdote.value = "";
      dispatch(setNotification(`Anecdote added: ${content}`));
    } else {
      dispatch(setNotification("Anecdote cannot be empty!"));
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
