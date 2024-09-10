import { createReducer, on } from "@ngrx/store";
import { ProductListState } from "src/app/interface/product";
import { addProductListAction } from "./product.action";


const productListInitialState: ProductListState = {
    productList: [],
};


export const productListReducer = createReducer(
    productListInitialState,
    on(addProductListAction, (state, action) => ({ ...state, ...action }))
)