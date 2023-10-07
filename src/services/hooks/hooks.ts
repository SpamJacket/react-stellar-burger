import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type { TAppDispatch, TRootState } from "../../utils/types";

export const useDispatch = () => dispatchHook<TAppDispatch>();
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
