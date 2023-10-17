import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "../actionCreators/order-details";
import { TOrderWithOwner } from "../../utils/types";

type TOrderDetailsState = {
  order: TOrderWithOwner | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TOrderDetailsState = {
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
      action: PayloadAction<TOrderWithOwner>
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
