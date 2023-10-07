import { combineReducers } from "redux";
import { ingredientsReducer } from "./burger-ingredients";
import { constructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";
import { feedReducer } from "./feed";
import { ordersReducer } from "./orders";
import { orderViewReducer } from "./order-view";

const rootReducer = combineReducers({
  ingredientsList: ingredientsReducer,
  constructorList: constructorReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  feed: feedReducer,
  orders: ordersReducer,
  orderView: orderViewReducer,
});

export default rootReducer;
