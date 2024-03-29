import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/slices/cartSlice.ts';
import { RootState } from '../../redux/store.ts';

type ProductCardProps = {
	id: string;
	title: string;
	price: number;
	image: string;
	toggle1: { num: number; title: string; extraPrice: number; disabled: boolean }[];
	toggle2: { num: number; title: string; extraPrice: number; disabled: boolean }[];
};

const ProductCard: React.FC<ProductCardProps> = ({
	id = '',
	title = '',
	price = 0,
	image = '',
	toggle1 = [],
	toggle2 = [],
}) => {
	const dispatch = useDispatch();
	const count =
		useSelector((state: RootState) =>
			state.cart.items.reduce((sum, item) => (sum += item.id === id ? item.count : 0), 0),
		) || 0;
	const [activeToggle1, setActiveToggle1] = useState(
		(toggle1.length && toggle1.find((toggle) => !toggle.disabled)?.num) || 0,
	);
	const [activeToggle2, setActiveToggle2] = useState(
		(toggle2.length && toggle2.find((toggle) => !toggle.disabled)?.num) || 0,
	);

	const selected1TogglePrice =
		(toggle1.length && toggle1.find((toggle) => toggle.num === activeToggle1)?.extraPrice) || 0;
	const selected2TogglePrice =
		(toggle2.length && toggle2.find((toggle) => toggle.num === activeToggle2)?.extraPrice) || 0;

	const onAddHandleClick = (e) => {
		e.preventDefault();
		const item: {
			id: string;
			title: string;
			price: number;
			count: number;
			image: string;
			toggle1: { num: number; title: string; extraPrice: number; disabled: boolean }[];
			toggle2: { num: number; title: string; extraPrice: number; disabled: boolean }[];
			activeToggle1: number;
			activeToggle2: number;
		} = {
			id,
			title,
			price,
			image,
			count,
			toggle1,
			toggle2,
			activeToggle1,
			activeToggle2,
		};
		dispatch(addProductToCart(item));
	};

	const onToggle1HandleClick = (e, toggle) => {
		e.preventDefault();
		!toggle.disabled && setActiveToggle1(toggle.num);
	};

	const onToggle2HandleClick = (e, toggle) => {
		e.preventDefault();
		!toggle.disabled && setActiveToggle2(toggle.num);
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<img className="pizza-block__image" src={image} alt="Pizza" />
				<h4 className="pizza-block__title">{title}</h4>
				<div className="pizza-block__selector">
					<ul>
						{toggle1.length
							? toggle1.map((toggle) => (
									<li
										key={toggle.num}
										onClick={(e) => onToggle1HandleClick(e, toggle)}
										className={`${activeToggle1 === toggle.num ? 'active' : ''}`}>
										{toggle.title}
									</li>
							  ))
							: null}
					</ul>
					<ul>
						{toggle2.length
							? toggle2.map((toggle) => (
									<li
										key={toggle.num}
										onClick={(e) => onToggle2HandleClick(e, toggle)}
										className={`${activeToggle2 === toggle.num ? 'active' : ''}`}>
										{toggle.title}
									</li>
							  ))
							: null}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">
						from {price + selected1TogglePrice + selected2TogglePrice} $
					</div>
					<button onClick={onAddHandleClick} className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Add</span>
						{count ? <i>{count}</i> : null}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
