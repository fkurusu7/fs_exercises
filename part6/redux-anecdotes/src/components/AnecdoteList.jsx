import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./../reducers/anecdoteReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state);
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <>
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
    </>
  );
}

export default AnecdoteList;
