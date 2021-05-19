import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import booksReducer from "./books-reducer";

let rootReducer = combineReducers({
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    booksPage: booksReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})


type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
store.getState().auth.isAuthorized = window.localStorage.getItem("auth") === "true"
let token = window.localStorage.getItem("token") === null ? "" : window.localStorage.getItem("token")
let role = window.localStorage.getItem("role") === null ? "" : window.localStorage.getItem("role")
store.getState().auth.token = <string>token;
store.getState().auth.role = <string>role;

// @ts-ignore
window.__store__ = store

export default store
