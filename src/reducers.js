import { ADD_CITY, REMOVE_CITY } from "./actions";

const initialState = {
  cityList: JSON.parse(localStorage.getItem("cityList")) || [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      const newCityListAdd = [...state.cityList, action.payload];
      localStorage.setItem("cityList", JSON.stringify(newCityListAdd));
      return {
        ...state,
        cityList: newCityListAdd,
      };
    case REMOVE_CITY:
      const newCityListRemove = state.cityList.filter(
        (city) => city !== action.payload
      );
      localStorage.setItem("cityList", JSON.stringify(newCityListRemove));
      return {
        ...state,
        cityList: newCityListRemove,
      };
    default:
      return state;
  }
};

export default rootReducer;
