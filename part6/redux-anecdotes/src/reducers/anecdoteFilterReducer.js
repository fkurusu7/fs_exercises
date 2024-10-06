import { createSlice, current } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { searchAnecdote } = filterSlice.actions;
export default filterSlice.reducer;

/*
// REDUCER
const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

// ACTION CREATOR
export const searchAnecdote = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
*/
