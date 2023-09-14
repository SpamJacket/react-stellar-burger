import { combineReducers } from "redux";
import { ingredientsReducer } from "./burger-ingredients.js";
import { constructorReducer } from "./burger-constructor.js";
import { ingredientDetails } from "./ingredient-details.js";
import { orderDetails } from "./order-details.js";
import { userReducer } from "./user.js";
import { feedReducer } from "./feed.js";
import { ordersReducer } from "./orders.js";

const rootReducer = combineReducers({
  ingredientsList: ingredientsReducer,
  constructorList: constructorReducer,
  ingredientDetails,
  orderDetails,
  user: userReducer,
  feed: feedReducer,
  orders: ordersReducer,
});

export default rootReducer;
