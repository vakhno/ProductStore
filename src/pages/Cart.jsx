import React from 'react';
import CartItem from '../components/CartItem';
import trash from '../assets/img/trash.svg';
import arrowLeft from '../assets/img/grey-arrow-left.svg';
import EmptyCart from '../components/EmptyCart';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';

function Cart() {
	const dispatch = useDispatch();
	const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);

	return (
		<div className="container container--cart">
			{items && items.length ? (
				<div className="cart">
					<div className="cart__top">
						<h2 className="content__title">Cart</h2>
						<div
							onClick={() => (window.confirm('Clear cart?') ? dispatch(clearCart()) : null)}
							className="cart__clear">
							<img src={trash} alt="trash logo" />
							<span>Clean cart</span>
						</div>
					</div>
					<div className="content__items">
						{items && items.length
							? items.map((item) => (
									<CartItem
										key={item.id}
										id={item.id}
										title={item.name}
										price={item.price}
										count={item.count}
										image={item.image}
										toggle1={item.activeToggle1}
										toggle2={item.activeToggle2}
										switchers1={item.switchers1}
										switchers2={item.switchers2}
									/>
							  ))
							: null}
					</div>
					<div className="cart__bottom">
						<div className="cart__bottom-details">
							<span>
								<img src={arrowLeft} alt="arrow logo" />
								Of all products: <b>{totalQuantity} pcs.</b>{' '}
							</span>
							<span>
								{' '}
								Order amount: <b>{totalPrice} $</b>{' '}
							</span>
						</div>
						<div className="cart__bottom-buttons">
							<Link to="/" className="button button--outline button--add go-back-btn">
								<span>Back</span>
							</Link>
							<div className="button pay-btn">
								<span>Pay right now</span>
							</div>
						</div>
					</div>
				</div>
			) : (
				<EmptyCart />
			)}
		</div>
	);
}

export default Cart;
