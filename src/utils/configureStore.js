import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";
import { saveState, loadState } from "./localStorage";

const configureStore = () => {
  const persistedState = loadState();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  );

  const subscribeHandler = () => {
    saveState({
      plants: store.getState().plants,
    });
  };

  store.subscribe(subscribeHandler);

  return store;
};

export default configureStore;
