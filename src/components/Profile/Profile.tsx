import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './ProfileInfo.module.css';
import {getUser} from "../../redux/users-selectors";
import {requestUser} from "../../redux/users-reducer";
import store from "../../redux/redux-store";
import userPhoto from "../../assets/images/user.png";
import {Redirect} from "react-router-dom";

const ProfileData: React.FC = () => {

    let profile = useSelector(getUser)
    const dispatch = useDispatch()

    useEffect(() => {
        debugger
        var jwt = require('jsonwebtoken');
        const decoded = jwt.verify(store.getState().auth.token, 'jwtappdemo');
        var userId = decoded.sub
        dispatch(requestUser(userId))
    }, [store])

    if (!store.getState().auth.isAuthorized) {
        return (
            <div>
                <Redirect to={'/login'}/>
            </div>
        )
    }
    return (
        <div>
            <img src={userPhoto} className={s.mainPhoto}/>

            <div>
                <b>Full name</b>: {profile.name}
            </div>
            <div>
                <b>Surname</b>: {profile.surname}
            </div>
            <div>
                <b>Login</b>: {profile.login}
            </div>
            <div>
                <b>Email</b>: {profile.email}
            </div>
        </div>
    )
}

export default ProfileData