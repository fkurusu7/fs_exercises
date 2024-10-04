import { useDispatch } from "react-redux";
import { searchAnecdote } from "../reducers/anecdoteFilterReducer";

function AnecdoteFilter() {
  const dispatch = useDispatch();

  const handleChange = (ev) => {
    console.log(ev.target.value);
    dispatch(searchAnecdote(ev.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Search: <input onChange={handleChange} />
    </div>
  );
}

export default AnecdoteFilter;
