import React, {FC, useEffect} from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './Book'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'
import {requestBooks} from "../../redux/books-reducer";
import {getBooks, getCurrentPage, getPageSize, getTotalBooksCount} from "../../redux/books-selector";
import Book from "./Book";

type PropsType = {}

type QueryParamsType = { term?: string; page?: string; friend?: string }
export const Books: FC<PropsType> = (props) => {
    const books = useSelector(getBooks)
    const totalBooksCount = useSelector(getTotalBooksCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(requestBooks(currentPage, pageSize))
    }, [currentPage, dispatch, history.location.search, pageSize])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/books',
            search: queryString.stringify(query)
        })
    }, [currentPage, history])


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestBooks(pageNumber, pageSize))
    }

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalBooksCount} pageSize={pageSize}/>
        <div>
            {
                books.map(b => <Book book={b}
                                     key={b.id}
                    />
                )
            }
        </div>
    </div>
}