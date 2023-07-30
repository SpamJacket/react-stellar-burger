import { combineReducers } from "redux";
import { ingredientsReducer } from "./burger-ingredients.js";
import { constructorList } from "./burger-constructor.js";
import { ingredientDetails } from "./ingredient-details.js";
import { orderDetails } from "./order-details.js";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorList,
  ingredientDetails,
  orderDetails,
});

export default rootReducer;
