import { combineReducers } from "redux";
import { ingredientsList } from "./burger-ingredients.js";
import { constructorList } from "./burger-constructor.js";
import { ingredientDetails } from "./ingredient-details.js";
import { orderDetails } from "./order-details.js";

const rootReducer = combineReducers({
  ingredientsList,
  constructorList,
  ingredientDetails,
  orderDetails,
});

export default rootReducer;
