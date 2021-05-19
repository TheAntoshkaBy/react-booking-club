import {BookType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {booksAPI} from "../api/books-api";

let initialState = {
    books: [] as Array<BookType>,
    pageSize: 10,
    totalBooksCount: 0,
    currentPage: 1,
    isFetching: true
}

const booksReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SN/BOOKS/SET_BOOKS': {
            return {...state, books: action.books}
        }
        case 'SN/BOOKS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/BOOKS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalBooksCount: action.count}
        }
        case 'SN/BOOKS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state
    }
}

export const actions = {
    setBooks: (books: Array<BookType>) => ({type: 'SN/BOOKS/SET_BOOKS', books} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/BOOKS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalBooksCount: (totalUsersCount: number) => ({
        type: 'SN/BOOKS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/BOOKS/TOGGLE_IS_FETCHING',
        isFetching
    } as const)
}

export const requestBooks = (page: number,
                             pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        let data = await booksAPI.getBooks(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        let count = data.booksCount;
        dispatch(actions.setTotalBooksCount(count))
        dispatch(actions.setBooks(data.items))
    }
}

export default booksReducer

export type InitialState = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
