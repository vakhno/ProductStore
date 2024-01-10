import React from 'react';
import emptyCart from '../../assets/img/cart-empty-cart.png';

function EmptyCart() {
	return (
		<div class="cart cart--empty">
			<h2>
				Cart is empty <span>😕</span>
			</h2>
			<p>
				Look like you didn`t select anything!
				<br />
				To select products you should go to home page!
			</p>
			<img src={emptyCart} alt="Empty cart" />
			<a class="button button--black" href="/">
				<span>Go to home page</span>
			</a>
		</div>
	);
}

export default EmptyCart;
