export interface User {
    sub: number,
    user: string,
    iat: number
}

export interface UserState {
    user: User | null;
}