import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOrderWithOwner } from "../../utils/types";
import { setOrderView } from "../actionCreators/order-view";

type TOrderViewState = {
  order: Array<TOrderWithOwner> | null;
  orderViewRequest: boolean;
  orderViewFailed: boolean;
};

const initialState: TOrderViewState = {
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
      action: PayloadAction<Array<TOrderWithOwner>>
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
