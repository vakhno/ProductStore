import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SetFiltersPayload = {
	category: string;
	sort: string;
};

const initialState: {
	searchValue: string;
	category: string;
	sort: string;
} = {
	searchValue: '',
	category: '',
	sort: 'rating',
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},
		setSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
		},
		setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
			state.category = action.payload.category;
			state.sort = action.payload.sort;
		},
	},
});

export const { setSearchValue, setCategory, setSort, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
