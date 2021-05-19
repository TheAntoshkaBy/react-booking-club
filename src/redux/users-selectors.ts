import {createSelector} from "reselect";
import { AppStateType } from "./redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users;
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getUser = (state: AppStateType) => {
    return state.usersPage.currentUser;
}

