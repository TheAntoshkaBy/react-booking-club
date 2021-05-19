import React, {FC, useEffect} from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import {requestUsers} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'

type PropsType = {}

type QueryParamsType = { term?: string; page?: string; friend?: string }
export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
    }, [currentPage, dispatch, history.location.search, pageSize])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [currentPage, history])


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize))
    }

    return <div>


        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     key={u.id}
                    />
                )
            }
        </div>
    </div>
}