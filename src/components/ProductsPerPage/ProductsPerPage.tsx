import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProductsPerPage } from '../../redux/slices/dataSlice.ts';
import debounce from 'lodash.debounce';
import { RootState } from '../../redux/store.ts';

function ProductsPerPage() {
	const dispatch = useDispatch();
	const [localProductsPerPage, setLocalProductsPerPage] = useState(0);
	const productsPerPage = useSelector((state: RootState) => state.data.productsPerPage);

	const debounceEvent = useCallback(
		debounce((value) => {
			dispatch(setProductsPerPage(value));
		}, 800),
		[],
	);

	const onChangeInput = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, '');
		setLocalProductsPerPage(value);
		debounceEvent(value);
	};

	useEffect(() => {
		setLocalProductsPerPage(productsPerPage);
	}, [productsPerPage]);

	return (
		<div className="productsPerPage">
			<div className="productsPerPage__label">
				<b>Products per page:</b>
				<input type="text" onChange={onChangeInput} value={localProductsPerPage} />
			</div>
		</div>
	);
}

export default ProductsPerPage;
