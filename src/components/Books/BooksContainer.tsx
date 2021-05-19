import React from 'react'
import {useSelector} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import {Books} from './Books'
import {getIsFetching} from "../../redux/books-selector";

type UsersPagePropsType = {
    pageTitle: string
}
export const BooksPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Books />
    </>
}
