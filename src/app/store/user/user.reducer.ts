import { createReducer, on } from "@ngrx/store";
import { UserState } from "../../interface/user";
import { addUserAction, deteleUserAction } from "./user.action";


export const initialState: UserState = {
    user: null,
};

// const initialState: User | null = null

export const userReducer = createReducer(
    initialState,
    on(addUserAction, (state, action) => ({ ...state, ...action })),
    on(deteleUserAction, (state, action) => ({ ...state, user: null }))
);
