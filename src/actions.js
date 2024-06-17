export const ADD_CITY = "ADD_CITY";
export const REMOVE_CITY = "REMOVE_CITY";

export const addCity = (city) => ({
  type: ADD_CITY,
  payload: city,
});

export const removeCity = (city) => ({
  type: REMOVE_CITY,
  payload: city,
});
