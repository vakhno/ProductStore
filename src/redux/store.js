import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import dataReducer from './slices/dataSlice';

export const store = configureStore({
	reducer: { filter: filterReducer, cart: cartReducer, data: dataReducer },
});
