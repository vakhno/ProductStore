import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchValue: '',
	category: '',
	sort: 'rating',
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setFilters: (state, action) => {
			state.activePage = action.payload.activePage;
			state.category = action.payload.category;
			state.sort = action.payload.sort;
		},
	},
});

export const { setSearchValue, setCategory, setSort, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
