import { configureStore } from "@reduxjs/toolkit";
import adoptionReducer from "./features/adoptionSlice";

export const makeStore = () => configureStore({ reducer: { adoption: adoptionReducer } });
