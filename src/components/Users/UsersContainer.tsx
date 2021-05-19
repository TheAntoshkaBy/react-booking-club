import React from 'react'
import {useSelector} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import {getIsFetching} from '../../redux/users-selectors'
import {Users} from './Users'
import {Redirect} from 'react-router-dom'
import store from "../../redux/redux-store";


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    const isLogged = store.getState().auth.isAuthorized;
    if(!isLogged) {
        return <Redirect to={'/login'}/>
    } else {
        return <>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    }

}
