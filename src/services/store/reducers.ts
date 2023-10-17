import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "../slices/burger-ingredients";
import constructorReducer from "../slices/burger-constructor";
import orderDetailsReducer from "../slices/order-details";
import userReducer from "../slices/user";
import feedReducer from "../slices/feed";
import ordersReducer from "../slices/orders";
import orderViewReducer from "../slices/order-view";

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
