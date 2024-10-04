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
