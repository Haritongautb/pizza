import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filterSlice from "./slices/filter/slice";
import cartSlice from "./slices/cart/slice";
import pizzasSlice from "./slices/pizzas/slice";
import { useDispatch } from "react-redux";



const reducers = combineReducers({
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice
})


export const store = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
