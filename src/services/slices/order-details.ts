import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "../actionCreators/order-details";
import { OrderWithOwner } from "../../utils/types";

type OrderDetailsState = {
  order: OrderWithOwner | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: OrderDetailsState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    [placeOrder.fulfilled.type]: (
      state,
      action: PayloadAction<OrderWithOwner>
    ) => {
      state.orderRequest = false;
      state.orderFailed = false;
      state.order = action.payload;
    },
    [placeOrder.rejected.type]: (state) => {
      state.orderFailed = true;
    },
  },
});

export default orderDetailsSlice.reducer;
