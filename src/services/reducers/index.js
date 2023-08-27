import { combineReducers } from "redux";
import { ingredientsReducer } from "./burger-ingredients.js";
import { constructorReducer } from "./burger-constructor.js";
import { ingredientDetails } from "./ingredient-details.js";
import { orderDetails } from "./order-details.js";

const rootReducer = combineReducers({
  ingredientsList: ingredientsReducer,
  constructorList: constructorReducer,
  ingredientDetails,
  orderDetails,
});

export default rootReducer;
