import {UserType, ProfileType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {usersAPI} from '../api/users-api'
import {GetUserType} from "../api/api";

let initialState = {
    users: [] as Array<UserType>,
    currentUser: {} as GetUserType,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/SET_USER': {
            return {...state, currentUser: action.user}
        }

        default:
            return state
    }
}

export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalBooksCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    setUser: (user: GetUserType) => ({type: 'SN/USERS/SET_USER', user} as const)
}

export const requestUsers = (page: number,
                             pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        let count = data.usersCount;
        dispatch(actions.setTotalBooksCount(count))
        dispatch(actions.setUsers(data.items))
    }
}

export const requestUser = (login: string): ThunkType => {
    return async (dispatch, getState) => {
        debugger
        let user = await usersAPI.getUser(login)
        dispatch(actions.setUser(user))
    }
}

export default usersReducer

export type InitialState = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
