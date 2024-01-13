import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice.ts';
import cartReducer from './slices/cartSlice.ts';
import dataReducer from './slices/dataSlice.ts';

export const store = configureStore({
	reducer: { filter: filterReducer, cart: cartReducer, data: dataReducer },
});

export type RootState = ReturnType<typeof store.getState>;
