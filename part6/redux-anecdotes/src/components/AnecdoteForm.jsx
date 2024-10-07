import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addAnecdote, createAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value.trim();
    if (content) {
      dispatch(createAnecdote(content));
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
