import React from 'react';

type CategoriesProps = {
	value: string;
	onChangeCategory: (value: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
	const categoriesList = [
		{ title: 'All', value: '' },
		{ title: 'Pizza', value: 'Pizza' },
		{ title: 'Salat', value: 'Salat' },
		{ title: 'Pasta', value: 'Pasta' },
		{ title: 'Ravioli', value: 'Ravioli' },
		{ title: 'Desert', value: 'Desert' },
		{ title: 'Drink', value: 'Drink' },
	];

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
};

export default Categories;
