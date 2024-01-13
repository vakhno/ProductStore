import React from 'react';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
	pages: number;
	activePage: number;
	onChangePage: (value: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pages, activePage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(e) => onChangePage(e.selected + 1)}
			pageRangeDisplayed={5}
			pageCount={pages}
			previousLabel="<"
			renderOnZeroPageCount={null}
			forcePage={activePage - 1}
		/>
	);
};

export default Pagination;
