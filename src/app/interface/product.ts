export interface ProductItem {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
}

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


export interface CardItem {
    id: number,
    userId: number,
    date: string,
    products: [
        {
            productId: number,
            quantity: number
        }
    ]
}


export interface CartList {
    products: [
        {
            productId: number,
            quantity: number
        }
    ]
}
