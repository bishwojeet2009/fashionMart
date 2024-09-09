export interface User {
    sub: number,
    user: string,
    iat: number
}

export interface UserInfo {
    id: number,
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    address: {
        city: string,
        street: string,
        number: string,
        zipcode: string,
        geolocation: {
            lat: string,
            long: string
        }
    },
    phone: string
}

export interface UserState {
    user: User | null;
}
export interface UserInfoState {
    userInfo: UserInfo | null;
}