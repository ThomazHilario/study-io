
interface UserProps{
    id: string,
    username:string,
    email:string,
    img:unknown,
}

export interface StoreProps{
    user: null | UserProps,
    setUserData: (id:string, username:string, email:string, img:unknown) => void
}