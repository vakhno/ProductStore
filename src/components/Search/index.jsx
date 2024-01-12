import React, { useState, useRef, useCallback } from 'react';
import styles from './styles.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

function Search() {
	const dispatch = useDispatch();
	const searchInputRef = useRef();
	const [localSearchValue, setLocalSearchValue] = useState('');

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setLocalSearchValue('');
		searchInputRef.current.focus();
	};

	const debounceEvent = useCallback(
		debounce((value) => {
			dispatch(setSearchValue(value));
		}, 500),
		[],
	);

	const onChangeInput = (event) => {
		setLocalSearchValue(event.target.value);
		debounceEvent(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={styles.icon}
				fill="none"
				height="24"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				width="24">
				<circle cx="11" cy="11" r="8" />
				<line x1="21" x2="16.65" y1="21" y2="16.65" />
			</svg>
			<input
				ref={searchInputRef}
				onChange={onChangeInput}
				value={localSearchValue}
				className={styles.input}
				placeholder="Product search..."
			/>
			{localSearchValue ? (
				<svg
					onClick={onClickClear}
					className={styles.clear}
					xmlns="http://www.w3.org/2000/svg"
					height="512px"
					id="Layer_1"
					version="1.1"
					viewBox="0 0 512 512"
					width="512px">
					<path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
				</svg>
			) : null}
		</div>
	);
}

export default Search;
