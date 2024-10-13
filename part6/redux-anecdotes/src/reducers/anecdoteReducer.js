// The status can be converted to a human-readable format by using the current function from the immer library.

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];
import { createSlice, current } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import anecdotesService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);

// REDUX ToolKit
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // ACTION CREATORS
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
    addVote(state, action) {
      const anecdoteId = String(action.payload);
      return state.map((anecdote) =>
        anecdote.id === anecdoteId
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addAnecdote, updateAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

// REDUX Thunks
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`Anecdote added ${newAnecdote.content}`));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

export const addVote = (id) => {
  return async (dispatch, getSate) => {
    const state = getSate();
    const anecdoteToChange = state.anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    const returnedAnecdote = await anecdotesService.createVote(
      id,
      updatedAnecdote
    );

    dispatch(updateAnecdote(returnedAnecdote));
  };
};

export default anecdoteSlice.reducer;
