import { createAction, props } from "@ngrx/store";
import { ProductItem } from "src/app/interface/product";

const ADDPRODUCTLIST = 'AddProductList'


export const addProductListAction = createAction(
    ADDPRODUCTLIST,
    props<{ productList: ProductItem[] }>()
)