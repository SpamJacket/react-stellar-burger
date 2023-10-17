import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/api";

export const setOrderView = createAsyncThunk(
  "orderView/fetchAll",
  async (number: string, thunkAPI) => {
    try {
      const res = await request(`/orders/${number}`, {
        method: "GET",
      });
      return res.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
