import { SET_CURRENT_PAGE } from "../actions";

export const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};
