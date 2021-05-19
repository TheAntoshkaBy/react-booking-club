import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../assets/images/user.png'
import {UserType} from '../../types/types'
import { NavLink } from 'react-router-dom'

type PropsType = {
    user: UserType
}

const User: React.FC<PropsType> = ({user}) => {
    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <img src={userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.surname}</div>
                        <div>{user.email}</div>
                        <div>{user.surname}</div>
                    </span>

                </span>
        </div>)
}

export default User
