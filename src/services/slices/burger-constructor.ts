import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIngredientWithUuid } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";

type TBurgerConstructorState = {
  bun: TIngredientWithUuid | null;
  filings: Array<TIngredientWithUuid>;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  filings: [],
};

export const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addToConstructorList(state, action: PayloadAction<TIngredientWithUuid>) {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        const filing = { ...action.payload, constructorId: uuidv4() };
        state.filings.push(filing);
      }
    },
    deleteFromConstructorList(state, action: PayloadAction<string>) {
      state.filings = state.filings.filter(
        (filing) => filing.constructorId !== action.payload
      );
    },
    cleanConstructorList(state) {
      state.bun = null;
      state.filings = [];
    },
    setFilings(state, action: PayloadAction<Array<TIngredientWithUuid>>) {
      state.filings = action.payload;
    },
  },
});

export default constructorSlice.reducer;
