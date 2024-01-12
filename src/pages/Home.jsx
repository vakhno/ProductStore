import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import ProductsPerPage from '../components/ProductsPerPage';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import LoadingError from '../components/LoadingError';
import Skeleton from '../components/ProductCard/Skeleton';
import { fetchData } from '../redux/slices/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setFilters } from '../redux/slices/filterSlice';
import { fetchPageCount, setActivePage } from '../redux/slices/dataSlice';

function Home() {
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const categoryId = useSelector((state) => state.filter.category);
	const sortType = useSelector((state) => state.filter.sort);
	const allPages = useSelector((state) => state.data.pageCount);
	const searchValue = useSelector((state) => state.filter.searchValue);
	const productsPerPage = useSelector((state) => state.data.productsPerPage);
	const activePage = useSelector((state) => state.data.activePage);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data, loading } = useSelector((state) => state.data);

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
			dispatch(fetchPageCount({ categoryId, sortType, searchValue, productsPerPage, activePage }));
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

	const handleChangeCategory = (value) => {
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
								switchers1={product.toggle1}
								switchers2={product.toggle2}
							/>
						</Link>
					))}
				</div>
			)}
			<Pagination
				pages={allPages}
				activePage={activePage}
				onChangePage={(page) => dispatch(setActivePage(page))}
			/>
		</div>
	);
}

export default Home;
