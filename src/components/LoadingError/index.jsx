import React from 'react';
import styles from './styles.module.scss';

function LoadingError() {
	return (
		<div className={styles.root}>
			<h1>
				<span>😞</span>
				<br />
				Somethign went wrong!
			</h1>
			<p className={styles.description}>Try to refresh!</p>
		</div>
	);
}

export default LoadingError;
