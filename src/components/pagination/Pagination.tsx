import React from "react";
import ReactPaginate from 'react-paginate';
import styles from "./pagination.module.scss";
import {PaginationTypesProps} from "./paginationTypes";

// II.
// React.FC<PizzaBlockTypesProps> - Здесь мы говорим, что наш компонент - это функциональный компонент, который принимает еще на входе какие-то пропсы с типами
export const Pagination: React.FC<PaginationTypesProps> = ({ currentPage, onHandlePageClick }) => {
    // I. pageRangeDisplayed - число пицц, которые должны быть на странице
    // I. pageCount - количество всего страниц. По сути количество страниц должен возвращать backend, но так как mockApi не умеет, то мы делаем прописывая руками
    // I. forcePage = пишем currentPage - 1, потому что создатели сделали так, что там нужно передать индексовое число, и получается у нас страница 1, а для них должно быть 0 и так далее со всеми страницами
    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(event) => onHandlePageClick(event.selected)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
            />
        </>
    );
}