import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/api";
import { endpoints } from "../../utils/constants";

export const placeOrder = createAsyncThunk(
  "orderDetails/fetchAll",
  async (
    {
      ingredients,
    }: {
      ingredients: ReadonlyArray<string>;
    },
    thunkAPI
  ) => {
    try {
      const res = await request(endpoints.ordersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ ingredients }),
      });
      return res.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
