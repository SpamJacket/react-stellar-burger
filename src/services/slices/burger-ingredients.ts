import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";
import { getIngredients } from "../actionCreators/burger-ingredients";

type TBurgerIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TBurgerIngredientsState = {
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
      action: PayloadAction<Array<TIngredient>>
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
