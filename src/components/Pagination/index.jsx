import React from 'react';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';

function Pagination({ pages, activePage, onChangePage }) {
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
}

export default Pagination;
