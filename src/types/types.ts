export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    name: string
    surname: string
    login: string
    email: string
}

export type UserType = {
    id: number
    name: string
    surname: string
    photos: PhotosType
    email: string
}

export type BookType = {
    id: number
    name: string
    description: string
    author: string
    count: number
}
