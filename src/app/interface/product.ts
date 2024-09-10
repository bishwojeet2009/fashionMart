export interface ProductItem {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
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

export interface ProductListState {
    productList: ProductItem[]
}
