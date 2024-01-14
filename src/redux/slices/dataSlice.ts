import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Product = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
	rating: number;
	popular: boolean;
	toggle1: { num: number; title: string; disabled: boolean; extraPrice: number }[];
	toggle2: { num: number; title: string; disabled: boolean; extraPrice: number }[];
};

interface FetchDataState {
	data: Product[];
	pageCount: number;
	activePage: number;
	productsPerPage: number;
	loading: 'loading' | 'success' | 'error';
}

const initialState: FetchDataState = {
	data: [],
	pageCount: 0,
	activePage: 1,
	productsPerPage: 8,
	loading: 'loading', // loading | success | error
};

type FetchProducts = {
	categoryId: string;
	sortType: string;
	searchValue: string;
	productsPerPage: number;
	activePage: number;
};

type FetchProductsPages = {
	categoryId: string;
	sortType: string;
	searchValue: string;
	productsPerPage: number;
};

export const fetchData = createAsyncThunk<Product[], FetchProducts>(
	'data/fetchData',
	async ({ categoryId, sortType, searchValue, productsPerPage, activePage }) => {
		const url = 'https://6579f84c1acd268f9afa80e7.mockapi.io/products';
		const category = categoryId ? `?category=${categoryId}` : '';
		const sort = `&sortBy=${sortType.replace('-', '')}`;
		const order = sortType.includes('-') ? '&order=asc' : '&order=desc';
		const search = searchValue ? `&name=${searchValue}` : '';
		const limit = `&limit=${productsPerPage}`;
		const page = `&page=${activePage}`;
		const { data } = await axios.get<Product[]>(
			`${url}${category}?${page}${limit}${sort}${order}${search}`,
		);
		const resultData = data || [];
		return resultData;
	},
);

export const fetchPageCount = createAsyncThunk(
	'data/fetchPageCount',
	async ({ categoryId, sortType, searchValue, productsPerPage }: FetchProductsPages) => {
		const url = 'https://6579f84c1acd268f9afa80e7.mockapi.io/products';
		const category = categoryId ? `?category=${categoryId}` : '';
		const sort = `&sortBy=${sortType.replace('-', '')}`;
		const order = sortType.includes('-') ? '&order=asc' : '&order=desc';
		const search = searchValue ? `&name=${searchValue}` : '';
		const { data } = await axios.get<Product[]>(`${url}${category}?${sort}${order}${search}`);
		const totalCount = data.length || 0;
		return Math.ceil(totalCount / productsPerPage) as number;
	},
);

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<Product[]>) => {
			state.data = action.payload;
		},
		setProductsPerPage: (state, action: PayloadAction<number>) => {
			state.activePage = 1;
			state.productsPerPage = action.payload
				? action.payload > 999
					? 999
					: action.payload < 1
					? 1
					: action.payload
				: state.productsPerPage;
		},
		setActivePage: (state, action: PayloadAction<number>) => {
			state.activePage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.loading = 'loading';
			})
			.addCase(fetchData.fulfilled, (state, action: PayloadAction<Product[]>) => {
				state.loading = 'success';
				state.data = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				console.log('error:', action);
				state.loading = 'error';
				state.data = [];
				state.activePage = 1;
				state.pageCount = 1;
			})
			.addCase(fetchPageCount.pending, (state, action) => {})
			.addCase(fetchPageCount.fulfilled, (state, action: PayloadAction<number>) => {
				state.pageCount = action.payload;
			})
			.addCase(fetchPageCount.rejected, (state, action) => {
				console.log('error:', action);
				state.data = [];
				state.activePage = 1;
				state.pageCount = 1;
			});
	},
});

export const { setData, setActivePage, setProductsPerPage } = dataSlice.actions;
export default dataSlice.reducer;
