import {
  ADD_TO_CONSTRUCTOR_LIST,
  DELETE_FROM_CONSTRUCTOR_LIST,
  CLEAN_CONSTRUCTOR_LIST,
  SET_FILINGS,
} from "../../utils/constants";

import { v4 as uuidv4 } from "uuid";

import type { TIngredient, TIngredientWithUuid } from "../../utils/types";

export interface IAddToConstructorListAction {
  readonly type: typeof ADD_TO_CONSTRUCTOR_LIST;
  readonly ingredient: TIngredientWithUuid;
}

export interface IDeleteFromConstructorListAction {
  readonly type: typeof DELETE_FROM_CONSTRUCTOR_LIST;
  readonly id: string;
}

export interface ICleanConstructorListAction {
  readonly type: typeof CLEAN_CONSTRUCTOR_LIST;
}

export interface ISetFilingsAction {
  readonly type: typeof SET_FILINGS;
  readonly filings: ReadonlyArray<TIngredientWithUuid>;
}

export type TBurgerConstructorActions =
  | IAddToConstructorListAction
  | IDeleteFromConstructorListAction
  | ICleanConstructorListAction
  | ISetFilingsAction;

export const addToConstructorList = (
  ingredient: TIngredient
): IAddToConstructorListAction => {
  return {
    type: ADD_TO_CONSTRUCTOR_LIST,
    ingredient: {
      ...ingredient,
      constructorId: uuidv4(),
    },
  };
};

export const deleteFromConstructorList = (
  id: string
): IDeleteFromConstructorListAction => {
  return {
    type: DELETE_FROM_CONSTRUCTOR_LIST,
    id,
  };
};

export const cleanConstructorList = (): ICleanConstructorListAction => {
  return {
    type: CLEAN_CONSTRUCTOR_LIST,
  };
};

export const setFilings = (
  filings: ReadonlyArray<TIngredientWithUuid>
): ISetFilingsAction => {
  return {
    type: SET_FILINGS,
    filings,
  };
};
