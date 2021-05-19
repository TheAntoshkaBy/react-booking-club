import React, {useEffect} from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'
import {useDispatch} from 'react-redux'
import {Redirect, useHistory} from 'react-router-dom'
import style from './../common/FormsControls/FormsControls.module.css'
import store from '../../redux/redux-store'
import {requestLogin} from '../../redux/auth-reducer'


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>>
    = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm)

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    const isAuth = store.getState().auth.isAuthorized;


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(requestLogin(formData.email, formData.password))
        if(store.getState().auth.isAuthorized) {
            history.push("/users")
        }
    }

    if (isAuth) {
        return <Redirect to={'/users    '}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}