import React from 'react'
import styles from './books.module.css'
import userPhoto from '../../assets/images/user.png'
import {BookType} from '../../types/types'
import {NavLink} from 'react-router-dom'

type PropsType = {
    book: BookType
}

const Book: React.FC<PropsType> = ({book}) => {
    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + book.id}>
                        <img src={userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                </span>
            <span>
                    <span>
                        <div>{book.name}</div>
                        <div>{book.description}</div>
                        <div>{book.author}</div>
                    </span>

                </span>
        </div>)
}

export default Book
