import React from 'react';
import plus from '../../assets/img/plus.svg';
import { useDispatch } from 'react-redux';
import {
	removeProductFromCart,
	incrementProduct,
	decrementProduct,
} from '../../redux/slices/cartSlice';

function CartItem({
	id = '',
	title = '',
	price = 0,
	count = 0,
	image = '',
	toggle1 = '',
	toggle2 = '',
	switchers1 = [],
	switchers2 = [],
}) {
	const dispatch = useDispatch();
	const selected1ToggleTitle =
		switchers1.length && switchers1.find((switcher) => switcher.num === toggle1).title;
	const selected2ToggleTitle =
		switchers2.length && switchers2.find((switcher) => switcher.num === toggle2).title;
	const selected1TogglePtice =
		switchers1.length && switchers1.find((switcher) => switcher.num === toggle1).extraPrice;
	const selected2TogglePrice =
		switchers2.length && switchers2.find((switcher) => switcher.num === toggle2).extraPrice;

	const onDecrementProductClick = () => {
		const item = {
			id,
			title,
			price,
			image,
			switchers1,
			switchers2,
			toggle1,
			toggle2,
		};
		dispatch(decrementProduct(item));
	};

	const onIncrementProductClick = () => {
		const item = {
			id,
			title,
			price,
			image,
			switchers1,
			switchers2,
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
			switchers1,
			switchers2,
			toggle1,
			toggle2,
		};
		dispatch(removeProductFromCart(item));
	};

	return (
		<div class="cart__item">
			<div class="cart__item-img">
				<img class="pizza-block__image" src={image} alt="Pizza" />
			</div>
			<div class="cart__item-info">
				<h3>{title}</h3>
				<p>
					{selected1ToggleTitle && `${selected1ToggleTitle} `}
					{selected2ToggleTitle && `${selected2ToggleTitle}`}
				</p>
			</div>
			<div class="cart__item-count">
				<button
					onClick={onDecrementProductClick}
					class="button button--outline button--circle cart__item-count-minus">
					<img src={plus} alt="minus logo" />
				</button>
				<b>{count}</b>
				<button
					onClick={onIncrementProductClick}
					class="button button--outline button--circle cart__item-count-plus">
					<img src={plus} alt="plus logo" />
				</button>
			</div>
			<div class="cart__item-price">
				<b>{(price + selected1TogglePtice + selected2TogglePrice) * count} $</b>
			</div>
			<div class="cart__item-remove">
				<button
					onClick={onRemoveProductFromCartClick}
					class="button button--outline button--circle">
					<img src={plus} alt="plus logo" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
