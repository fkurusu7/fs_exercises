/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AnecdoteFilter from "./components/AnecdoteFilter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import anecdotesService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
