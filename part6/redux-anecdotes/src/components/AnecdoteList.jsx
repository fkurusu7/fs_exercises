import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./../reducers/anecdoteReducer";

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    // No SEARCH term, so return all anecdotes
    if (filter === "") return anecdotes;

    //  SEARCH term, so return filtered anecdotes
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredAnecdotes;
  });
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <>
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
