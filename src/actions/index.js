import axios from "axios";

export const PLANT_LIST = "PLANT_LIST";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const UPDATE_PLANT = "UPDATE_PLANT";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const setError = (hasError) => ({
  type: SET_ERROR,
  payload: hasError,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const getPage = (page) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(
        `https://swapi.dev/api/planets/?page=${page}`
      );

      dispatch({
        type: PLANT_LIST,
        payload: {
          [page]: {
            ...response.data,
          },
        },
      });

      dispatch(setCurrentPage(page));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(true));
    }
  };
};

export const updatePlant = (currentPage, plantItem) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PLANT,
      payload: { currentPage, plantItem },
    });
  };
};
