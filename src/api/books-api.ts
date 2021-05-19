import {GetBooksType, instance} from './api';


export const booksAPI = {
    getBooks(currentPage = 1, pageSize = 10) {
        return instance.get<GetBooksType>(`books?page=${currentPage}&size=${pageSize}`)
            .then(res => res.data)
    }
}