import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

const getBooksSelector = (state: AppStateType) => {
    return state.booksPage.books;
}

export const getBooks = createSelector(getBooksSelector, (books) => {
        return books;
    })

export const getPageSize = (state: AppStateType) => {
    return state.booksPage.pageSize;
}

export const getTotalBooksCount = (state: AppStateType) => {
    return state.booksPage.totalBooksCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.booksPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.booksPage.isFetching;
}
