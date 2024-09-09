import { createReducer, on } from "@ngrx/store";
import { UserInfoState, UserState } from "../../interface/user";
import { addUserAction, deteleUserAction } from "./user.action";


const userInitialState: UserState = {
    user: null,
};
const userInfoInitialState: UserInfoState = {
    userInfo: null,
};

// const initialState: User | null = null

export const userReducer = createReducer(
    userInitialState,
    on(addUserAction, (state, action) => ({ ...state, ...action })),
    on(deteleUserAction, (state, action) => ({ ...state, user: null }))
);

export const userInfoReducer = createReducer(
    userInfoInitialState,
    on(addUserAction, (state, action) => ({ ...state, ...action })),
    on(deteleUserAction, (state, action) => ({ ...state, userInfo: null }))
)