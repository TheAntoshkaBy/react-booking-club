import axios from "axios";
import {BookType, UserType} from '../types/types';

export const instance = axios.create({
    baseURL: 'http://localhost:80/',
    headers: {
        post: {
            Authorization: 'off'
        }
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    usersCount: number
    error: string | null
}
export type GetUserType = {
    "id": number,
    "name": string,
    "surname": string,
    "login": string,
    "email": "string"
}

export type PostLogin = {
    isLogged : boolean
    token : string
    role: string
}

export type GetBooksType = {
    items: Array<BookType>
    booksCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
