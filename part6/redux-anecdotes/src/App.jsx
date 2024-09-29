/* eslint-disable no-unused-vars */
import AnecdoteForm from "./components/AnecdoteForm";
import { addVote } from "./reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleAddVote = (id) => {
    dispatch(addVote(id));
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
      <AnecdoteForm />
    </div>
  );
};

export default App;
