import React from 'react';
import plus from '../../assets/img/plus.svg';
import { useDispatch } from 'react-redux';
import {
	removeProductFromCart,
	incrementProduct,
	decrementProduct,
} from '../../redux/slices/cartSlice.ts';

type CartItemProps = {
	id: string;
	title: string;
	price: number;
	count: number;
	image: string;
	toggle1: { num: number; title: string; extraPrice: number }[];
	toggle2: { num: number; title: string; extraPrice: number }[];
	activeToggle1: number;
	activeToggle2: number;
};

const CartItem: React.FC<CartItemProps> = ({
	id = '',
	title = '',
	price = 0,
	count = 0,
	image = '',
	toggle1 = [],
	toggle2 = [],
	activeToggle1 = 0,
	activeToggle2 = 0,
}) => {
	const dispatch = useDispatch();
	const selected1ToggleTitle =
		(toggle1.length && toggle1.find((switcher) => switcher.num === Number(toggle1))?.title) || '';
	const selected2ToggleTitle =
		(toggle2.length && toggle2.find((switcher) => switcher.num === Number(toggle2))?.title) || '';
	const selected1TogglePrice =
		(toggle1.length && toggle1.find((switcher) => switcher.num === Number(toggle1))?.extraPrice) ||
		0;
	const selected2TogglePrice =
		(toggle2.length && toggle2.find((switcher) => switcher.num === Number(toggle2))?.extraPrice) ||
		0;

	const onDecrementProductClick = () => {
		const item = {
			id,
			title,
			price,
			image,
			activeToggle1,
			activeToggle2,
			toggle1,
			toggle2,
		};
		dispatch(decrementProduct(item));
	};

	const onIncrementProductClick = () => {
		const item: CartItemProps = {
			id,
			title,
			price,
			image,
			count,
			activeToggle1,
			activeToggle2,
			toggle1,
			toggle2,
		};
		dispatch(incrementProduct(item));
	};

	const onRemoveProductFromCartClick = () => {
		const item = {
			id,
			title,
			price,
			image,
			activeToggle1,
			activeToggle2,
			toggle1,
			toggle2,
		};
		dispatch(removeProductFromCart(item));
	};

	return (
		<div className="cart__item">
			<div className="cart__item-img">
				<img className="pizza-block__image" src={image} alt="Pizza" />
			</div>
			<div className="cart__item-info">
				<h3>{title}</h3>
				<p>
					{selected1ToggleTitle && `${selected1ToggleTitle} `}
					{selected2ToggleTitle && `${selected2ToggleTitle}`}
				</p>
			</div>
			<div className="cart__item-count">
				<button
					onClick={onDecrementProductClick}
					className="button button--outline button--circle cart__item-count-minus">
					<img src={plus} alt="minus logo" />
				</button>
				<b>{count}</b>
				<button
					onClick={onIncrementProductClick}
					className="button button--outline button--circle cart__item-count-plus">
					<img src={plus} alt="plus logo" />
				</button>
			</div>
			<div className="cart__item-price">
				<b>{(price + selected1TogglePrice + selected2TogglePrice) * count} $</b>
			</div>
			<div className="cart__item-remove">
				<button
					onClick={onRemoveProductFromCartClick}
					className="button button--outline button--circle">
					<img src={plus} alt="plus logo" />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
