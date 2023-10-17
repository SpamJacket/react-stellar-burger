import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Ingredient } from "../../utils/types";
import { getIngredients } from "../actionCreators/burger-ingredients";

type BurgerIngredientsState = {
  ingredients: ReadonlyArray<Ingredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: BurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: {
    [getIngredients.pending.type]: (state) => {
      state.ingredientsRequest = true;
      state.ingredientsFailed = false;
    },
    [getIngredients.fulfilled.type]: (
      state,
      action: PayloadAction<Array<Ingredient>>
    ) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = false;
      state.ingredients = action.payload;
    },
    [getIngredients.rejected.type]: (state) => {
      state.ingredientsFailed = true;
    },
  },
});

export default ingredientsSlice.reducer;
