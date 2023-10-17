import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOrderWithId } from "../../utils/types";

type TFeedState = {
  status: string;
  orders: Array<TOrderWithId>;
  total: number | null;
  totalToday: number | null;
  error: string;
};

const initialState: TFeedState = {
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
        orders: Array<TOrderWithId>;
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