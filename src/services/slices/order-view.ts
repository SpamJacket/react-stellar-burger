import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { OrderWithOwner } from "../../utils/types";
import { setOrderView } from "../actionCreators/order-view";

type OrderViewState = {
  order: Array<OrderWithOwner> | null;
  orderViewRequest: boolean;
  orderViewFailed: boolean;
};

const initialState: OrderViewState = {
  order: null,
  orderViewRequest: false,
  orderViewFailed: false,
};

export const orderViewSlice = createSlice({
  name: "orderView",
  initialState,
  reducers: {
    cleanOrderView(state) {
      state.order = null;
      state.orderViewRequest = false;
      state.orderViewFailed = false;
    },
  },
  extraReducers: {
    [setOrderView.pending.type]: (state) => {
      state.orderViewRequest = true;
      state.orderViewFailed = false;
    },
    [setOrderView.fulfilled.type]: (
      state,
      action: PayloadAction<Array<OrderWithOwner>>
    ) => {
      state.orderViewRequest = false;
      state.orderViewFailed = false;
      state.order = action.payload;
    },
    [setOrderView.rejected.type]: (state) => {
      state.orderViewFailed = true;
    },
  },
});

export default orderViewSlice.reducer;
