/* eslint-disable no-unused-vars */
import { addVote, addAnecdote } from "./reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

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
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleAddVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
