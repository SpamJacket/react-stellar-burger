import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/api";
import { endpoints } from "../../utils/constants";

export const getIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await request(endpoints.ingredientsUrl);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
