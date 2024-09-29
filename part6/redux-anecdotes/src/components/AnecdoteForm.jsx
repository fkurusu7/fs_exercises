import { useSelector, useDispatch } from "react-redux";
import { addAnecdote } from "./../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value.trim();
    if (content) {
      ev.target.anecdote.value = "";
      dispatch(addAnecdote(content));
    } else {
      alert("Anecdote cannot be empty!");
    }
  };

  return (
    <form onSubmit={handleAddAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
}

export default AnecdoteForm;
