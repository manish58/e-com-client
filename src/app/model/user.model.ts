export interface UserSchema {
    _id: string,
    userName: string,
    email: string,
    password?: string,
    isSeller: boolean,
    cart: [],
    created_at?: Date,
    updated_at?: Date
}
export interface User {
    token?: string,
    user: UserSchema
}