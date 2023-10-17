import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { OrderWithId } from "../../utils/types";

type FeedState = {
  status: string;
  orders: Array<OrderWithId>;
  total: number | null;
  totalToday: number | null;
  error: string;
};

const initialState: FeedState = {
  status: "offline",
  orders: [],
  total: null,
  totalToday: null,
  error: "",
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    connect(state, action: PayloadAction<string>) {},
    disconnect() {},
    wsConnecting(state) {
      state.status = "connecting";
    },
    wsOpen(state) {
      state.status = "online";
      state.error = "";
    },
    wsClose(state) {
      state.status = "offline";
    },
    wsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    wsMessage(
      state,
      action: PayloadAction<{
        orders: Array<OrderWithId>;
        total: number;
        totalToday: number;
      }>
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export default feedSlice.reducer;
