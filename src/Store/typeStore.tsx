
interface UserProps{
    id: string,
    name:string,
    email:string,
    img:unknown,
}

export interface StoreProps{
    user: null | UserProps
}