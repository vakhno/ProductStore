import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	totalQuantity: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart: (state, action) => {
			const sameItem = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.activeToggle1 === action.payload.activeToggle1 &&
					item.activeToggle2 === action.payload.activeToggle2,
			);
			if (sameItem) {
				sameItem.count++;
			} else {
				action.payload.count = 1;
				state.items.push(action.payload);
			}
			const extraPrice1 =
				(action.payload.switchers1.length &&
					action.payload.switchers1.find(
						(switcher) => switcher.num === action.payload.activeToggle1,
					).extraPrice) ||
				0;
			const extraPrice2 =
				(action.payload.switchers2.length &&
					action.payload.switchers2.find(
						(switcher) => switcher.num === action.payload.activeToggle2,
					).extraPrice) ||
				0;
			state.totalPrice += action.payload.price + extraPrice1 + extraPrice2;
			state.totalQuantity++;
		},
		incrementProduct: (state, action) => {
			const sameItem = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.activeToggle1 === action.payload.toggle1 &&
					item.activeToggle2 === action.payload.toggle2,
			);
			if (sameItem && sameItem.count < 9) {
				sameItem.count++;
				const extraPrice1 =
					(action.payload.switchers1.length &&
						action.payload.switchers1.find((switcher) => switcher.num === action.payload.toggle1)
							.extraPrice) ||
					0;
				const extraPrice2 =
					(action.payload.switchers2.length &&
						action.payload.switchers2.find((switcher) => switcher.num === action.payload.toggle2)
							.extraPrice) ||
					0;
				state.totalPrice += sameItem.price + extraPrice1 + extraPrice2;
				state.totalQuantity++;
			}
		},
		decrementProduct: (state, action) => {
			const sameItem = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.activeToggle1 === action.payload.toggle1 &&
					item.activeToggle2 === action.payload.toggle2,
			);
			if (sameItem && sameItem.count > 1) {
				sameItem.count--;
				const extraPrice1 =
					(action.payload.switchers1.length &&
						action.payload.switchers1.find((switcher) => switcher.num === action.payload.toggle1)
							.extraPrice) ||
					0;
				const extraPrice2 =
					(action.payload.switchers2.length &&
						action.payload.switchers2.find((switcher) => switcher.num === action.payload.toggle2)
							.extraPrice) ||
					0;
				state.totalPrice -= sameItem.price + extraPrice1 + extraPrice2;
				state.totalQuantity--;
			}
		},
		removeProductFromCart: (state, action) => {
			const sameItem = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.activeToggle1 === action.payload.toggle1 &&
					item.activeToggle2 === action.payload.toggle2,
			);
			if (sameItem) {
				state.items = state.items.filter(
					(item) =>
						!(
							item.id === sameItem.id &&
							item.activeToggle1 === sameItem.activeToggle1 &&
							item.activeToggle2 === sameItem.activeToggle2
						),
				);
				const extraPrice1 =
					(action.payload.switchers1.length &&
						action.payload.switchers1.find((switcher) => switcher.num === action.payload.toggle1)
							.extraPrice) ||
					0;
				const extraPrice2 =
					(action.payload.switchers2.length &&
						action.payload.switchers2.find((switcher) => switcher.num === action.payload.toggle2)
							.extraPrice) ||
					0;
				state.totalPrice -= sameItem.count * (sameItem.price + extraPrice1 + extraPrice2);
				state.totalQuantity -= sameItem.count;
			}
		},
		clearCart: (state) => {
			state.totalPrice = 0;
			state.totalQuantity = 0;
			state.items = [];
		},
	},
});

export const {
	addProductToCart,
	removeProductFromCart,
	clearCart,
	incrementProduct,
	decrementProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
