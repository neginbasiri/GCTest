import { PLANT_LIST, UPDATE_PLANT } from "../actions";

export const plantsReducer = (state = {}, action) => {
  switch (action.type) {
    case PLANT_LIST:
      return { ...state, ...action.payload };
    case UPDATE_PLANT: {
      const { currentPage, plantItem } = action.payload;
      const entity = state[currentPage].results.filter(
        (item) => item.url !== plantItem.url
      );

      return {
        ...state,
        [currentPage]: {
          ...state[currentPage],
          results: [...entity, plantItem],
        },
      };
    }
    default:
      return state;
  }
};
