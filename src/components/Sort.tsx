import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice.ts';
import { RootState } from '../redux/store.ts';

const sortList: {
	title: string;
	value: string;
}[] = [
	{ title: 'rating 🠕', value: 'rating' },
	{ title: 'rating 🠗', value: '-rating' },
	{ title: 'price 🠕', value: 'price' },
	{ title: 'price 🠗', value: '-price' },
	{ title: 'desc', value: 'name' },
	{ title: 'asc', value: '-name' },
];

const Sort: React.FC = () => {
	const sortType = useSelector((state: RootState) => state.filter.sort);
	const sortTypeTitle =
		useSelector(
			(state: RootState) =>
				sortList.find((sortItem) => sortItem.value === state.filter.sort)?.title,
		) || '';
	const dispatch = useDispatch();
	const sortRef = useRef<HTMLDivElement>(null);
	const [isVisibleSort, setIsVisibleSort] = useState(false);

	const handleClickSort = (value: string) => {
		dispatch(setSort(value));
		setIsVisibleSort(false);
	};

	useEffect(() => {
		const closePopupEvent = (event: Event) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setIsVisibleSort(false);
			}
		};
		document.body.addEventListener('click', closePopupEvent as any);
		return () => {
			document.body.removeEventListener('click', closePopupEvent as any);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Sort by:</b>
				<span onClick={() => setIsVisibleSort(!isVisibleSort)}>{sortTypeTitle}</span>
			</div>
			{isVisibleSort ? (
				<div className="sort__popup">
					<ul>
						{sortList.map((sort) => (
							<li
								onClick={() => {
									handleClickSort(sort.value);
								}}
								className={`${sort.value === sortType ? 'active' : ''}`}
								key={sort.value}>
								{sort.title}
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default Sort;
