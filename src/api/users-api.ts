import {GetItemsType, GetUserType, instance, PostLogin} from './api';


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, token = "") {
        instance.interceptors.request.use(config => {
            config.headers.post['Authorization'] = token;
            return config;
        })

        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    getUser(login = "", token = "") {
        instance.interceptors.request.use(config => {
            config.headers.post['Authorization'] = token;
            return config;
        })

        return instance.get<GetUserType>(`users/find?login=${login}`)
            .then(res => res.data)
    },
    login(email= "", password = "") {
            return instance.post<PostLogin>('login',
                {
                login: email,
                password: password
                }).then(res => res.data)

    }
}
