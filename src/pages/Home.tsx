import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination.tsx';
import Sort from '../components/Sort.tsx';
import ProductsPerPage from '../components/ProductsPerPage/ProductsPerPage.tsx';
import Categories from '../components/Categories.tsx';
import ProductCard from '../components/ProductCard/ProductCard.tsx';
import LoadingError from '../components/LoadingError/LoadingError.tsx';
import Skeleton from '../components/ProductCard/Skeleton.jsx';
import { fetchData } from '../redux/slices/dataSlice.ts';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setFilters } from '../redux/slices/filterSlice.ts';
import { fetchPageCount, setActivePage } from '../redux/slices/dataSlice.ts';
import { RootState } from '../redux/store.ts';

function Home() {
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const categoryId = useSelector((state: RootState) => state.filter.category);
	const sortType = useSelector((state: RootState) => state.filter.sort);
	const allPages = useSelector((state: RootState) => state.data.pageCount);
	const searchValue = useSelector((state: RootState) => state.filter.searchValue);
	const productsPerPage = useSelector((state: RootState) => state.data.productsPerPage);
	const activePage = useSelector((state: RootState) => state.data.activePage);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data, loading } = useSelector((state: RootState) => state.data);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			dispatch(
				setFilters({
					category: params.categoryId,
					sort: params.sortType,
				}),
			);
			dispatch(setActivePage(params.activePage));
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		if (!isSearch.current) {
			// @ts-ignore
			dispatch(fetchPageCount({ categoryId, sortType, searchValue, productsPerPage, activePage }));
			// @ts-ignore
			dispatch(fetchData({ categoryId, sortType, searchValue, productsPerPage, activePage }));
			window.scrollTo(0, 0);
		}
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, productsPerPage, activePage]);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({ categoryId, sortType, activePage });
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, searchValue, productsPerPage, activePage]);

	const handleChangeCategory = (value: string) => {
		dispatch(setActivePage(1));
		dispatch(setCategory(value));
	};

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={handleChangeCategory} />
				<Sort />
				<ProductsPerPage />
			</div>
			<h2 className="content__title">Products:</h2>

			{loading === 'loading' ? (
				[...new Array(productsPerPage)].map((elem, index) => <Skeleton key={index} />)
			) : loading === 'error' ? (
				<LoadingError />
			) : (
				<div className="content__items">
					{data.map((product) => (
						<Link to={`product/${product.id}`} key={product.id}>
							<ProductCard
								key={product.id}
								id={product.id}
								title={product.name}
								price={product.price}
								image={product.imageUrl}
								toggle1={product.toggle1}
								toggle2={product.toggle2}
							/>
						</Link>
					))}
				</div>
			)}
			<Pagination
				pages={allPages}
				activePage={activePage}
				onChangePage={(page: number) => dispatch(setActivePage(page))}
			/>
		</div>
	);
}

export default Home;
