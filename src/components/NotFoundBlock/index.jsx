import React from 'react';
import styles from './styles.module.scss';

function NotFoundBlock() {
	return (
		<div className={styles.root}>
			<h1>
				<span>😞</span>
				<br />
				Not Found
			</h1>
			<p className={styles.description}>No such page on our store.</p>
		</div>
	);
}

export default NotFoundBlock;
