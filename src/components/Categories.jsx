import React, { useState } from 'react';

function Categories({ value, onChangeCategory }) {
	// const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

	const categoriesList = [
		{ title: 'All', value: '' },
		{ title: 'Pizza', value: 'Pizza' },
		{ title: 'Salat', value: 'Salat' },
		{ title: 'Pasta', value: 'Pasta' },
		{ title: 'Ravioli', value: 'Ravioli' },
		{ title: 'Desert', value: 'Desert' },
		{ title: 'Drink', value: 'Drink' },
	];

	// const onClickCategory = (activeIndex = 0) => {
	// 	setActiveCategoryIndex(activeIndex);
	// };

	return (
		<div className="categories">
			<ul>
				{categoriesList.map((caterogy) => (
					<li
						key={caterogy.value}
						onClick={() => onChangeCategory(caterogy.value)}
						className={value === caterogy.value ? 'active' : ''}>
						{caterogy.title}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
