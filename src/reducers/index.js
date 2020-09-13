import { combineReducers } from "redux";
import { errorReducer } from "./error";
import { loadingReducer } from "./loading";
import { pageReducer } from "./pager";
import { plantsReducer } from "./plants";

export const reducers = combineReducers({
  currentPage: pageReducer,
  plants: plantsReducer,
  isLoading: loadingReducer,
  hasError: errorReducer,
});
