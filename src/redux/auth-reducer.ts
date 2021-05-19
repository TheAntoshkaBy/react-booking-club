import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

let initialState = {
    isAuthorized: false,
    role: "Guest",
    token: ""
}


const authReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SN/AUTH/AUTH': {
            return {...state, isAuthorized: action.auth, role: action.role, token: action.token}
        }

        default:
            return state
    }
}

export const actions = {
    auth: (auth: boolean, role: string, token: string) => ({type: 'SN/AUTH/AUTH', auth, role, token} as const)
}

export const requestLogin = (email: string,
                             password: string): ThunkType => {
    return async (dispatch, getState) => {
        let data = await usersAPI.login(email, password);
        debugger
        dispatch(actions.auth(data.isLogged, data.token, data.role))
        window.localStorage.setItem("auth", data.isLogged.toString())
        window.localStorage.setItem("token", data.token)
        window.localStorage.setItem("role", data.role)

    }
}

export default authReducer
export type InitialState = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

